import { and, asc, desc, eq, ilike, inArray, isNull, sql } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { mediaAssets } from "@/db/schema";
import { createR2UploadUrl, safeObjectName } from "@/lib/r2";

const mediaType = z.enum(["image", "video", "audio", "document"]);
const allowedMimePrefixes = ["image/", "video/", "audio/"];
const allowedDocuments = ["application/pdf", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
const maxFileSize = 100 * 1024 * 1024;

const assetInput = z.object({
  parentAssetId: z.string().optional(),
  name: z.string().min(1).max(180),
  objectKey: z.string().min(1),
  url: z.string().url(),
  mediaType,
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().nonnegative().max(maxFileSize),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  durationSeconds: z.number().int().nonnegative().optional(),
  altText: z.string().max(500).optional(),
  caption: z.string().max(2000).optional(),
  source: z.string().max(120).optional(),
  tags: z.array(z.string().max(50)).max(30).default([]),
});

const getUserId = (c: any) => c.get("authUser")?.token?.sub as string | undefined;

const app = new Hono()
  .get(
    "/",
    verifyAuth(),
    zValidator("query", z.object({
      page: z.coerce.number().int().positive().default(1),
      limit: z.coerce.number().int().min(1).max(100).default(40),
      query: z.string().optional(),
      type: mediaType.or(z.literal("all")).default("all"),
      month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
      sort: z.enum(["newest", "oldest", "name", "size"]).default("newest"),
    })),
    async (c) => {
      const userId = getUserId(c);
      if (!userId) return c.json({ error: "Unauthorized" }, 401);
      const input = c.req.valid("query");
      const conditions = [eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt)];
      if (input.type !== "all") conditions.push(eq(mediaAssets.mediaType, input.type));
      if (input.query) conditions.push(ilike(mediaAssets.name, `%${input.query}%`));
      if (input.month) conditions.push(sql`to_char(${mediaAssets.createdAt}, 'YYYY-MM') = ${input.month}`);
      const order = input.sort === "oldest" ? asc(mediaAssets.createdAt) : input.sort === "name" ? asc(mediaAssets.name) : input.sort === "size" ? desc(mediaAssets.sizeBytes) : desc(mediaAssets.createdAt);
      const data = await db.select().from(mediaAssets).where(and(...conditions)).limit(input.limit).offset((input.page - 1) * input.limit).orderBy(order);
      return c.json({ data: data.map(serializeAsset), nextPage: data.length === input.limit ? input.page + 1 : null });
    },
  )
  .get("/filter-options", verifyAuth(), async (c) => {
    const userId = getUserId(c);
    if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const rows = await db.select({ createdAt: mediaAssets.createdAt, tagsJson: mediaAssets.tagsJson }).from(mediaAssets).where(and(eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt)));
    const months = Array.from(new Set(rows.map((row) => row.createdAt.toISOString().slice(0, 7)))).sort().reverse();
    const tags = Array.from(new Set(rows.flatMap((row) => parseTags(row.tagsJson)))).sort();
    return c.json({ data: { months, tags } });
  })
  .post(
    "/upload-url",
    verifyAuth(),
    zValidator("json", z.object({ name: z.string().min(1), mimeType: z.string().min(1), sizeBytes: z.number().int().positive().max(maxFileSize) })),
    async (c) => {
      const userId = getUserId(c);
      if (!userId) return c.json({ error: "Unauthorized" }, 401);
      const { name, mimeType } = c.req.valid("json");
      if (!allowedMimePrefixes.some((prefix) => mimeType.startsWith(prefix)) && !allowedDocuments.includes(mimeType)) {
        return c.json({ error: "Unsupported file type" }, 415);
      }
      const objectKey = `users/${userId}/media/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeObjectName(name)}`;
      const signed = await createR2UploadUrl(objectKey, mimeType);
      return c.json({ data: { ...signed, objectKey } });
    },
  )
  .post("/", verifyAuth(), zValidator("json", assetInput), async (c) => {
    const userId = getUserId(c);
    if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const input = c.req.valid("json");
    const { tags, ...asset } = input;
    const now = new Date();
    const [data] = await db.insert(mediaAssets).values({ ...asset, tagsJson: JSON.stringify(tags), userId, createdAt: now, updatedAt: now }).returning();
    return c.json({ data: serializeAsset(data) }, 201);
  })
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ name: z.string().min(1).max(180).optional(), altText: z.string().max(500).optional(), caption: z.string().max(2000).optional(), tags: z.array(z.string().max(50)).max(30).optional() })),
    async (c) => {
      const userId = getUserId(c);
      if (!userId) return c.json({ error: "Unauthorized" }, 401);
      const { id } = c.req.valid("param");
      const input = c.req.valid("json");
      const { tags, ...asset } = input;
      const [data] = await db.update(mediaAssets).set({ ...asset, tagsJson: tags ? JSON.stringify(tags) : undefined, updatedAt: new Date() }).where(and(eq(mediaAssets.id, id), eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt))).returning();
      if (!data) return c.json({ error: "Not found" }, 404);
      return c.json({ data: serializeAsset(data) });
    },
  )
  .post("/:id/versions", verifyAuth(), zValidator("param", z.object({ id: z.string() })), zValidator("json", assetInput.omit({ parentAssetId: true })), async (c) => {
    const userId = getUserId(c);
    if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const { id } = c.req.valid("param");
    const [parent] = await db.select({ id: mediaAssets.id }).from(mediaAssets).where(and(eq(mediaAssets.id, id), eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt)));
    if (!parent) return c.json({ error: "Not found" }, 404);
    const input = c.req.valid("json");
    const { tags, ...asset } = input;
    const now = new Date();
    const [data] = await db.insert(mediaAssets).values({ ...asset, parentAssetId: id, tagsJson: JSON.stringify(tags), userId, createdAt: now, updatedAt: now }).returning();
    return c.json({ data: serializeAsset(data) }, 201);
  })
  .post("/bulk", verifyAuth(), zValidator("json", z.object({ ids: z.array(z.string()).min(1).max(200), action: z.enum(["trash", "tag"]), tag: z.string().max(50).optional() })), async (c) => {
    const userId = getUserId(c);
    if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const { ids, action, tag } = c.req.valid("json");
    if (action === "trash") {
      const data = await db.update(mediaAssets).set({ deletedAt: new Date(), updatedAt: new Date() }).where(and(eq(mediaAssets.userId, userId), inArray(mediaAssets.id, ids), isNull(mediaAssets.deletedAt))).returning({ id: mediaAssets.id });
      return c.json({ data });
    }
    if (!tag) return c.json({ error: "Tag is required" }, 400);
    const rows = await db.select().from(mediaAssets).where(and(eq(mediaAssets.userId, userId), inArray(mediaAssets.id, ids), isNull(mediaAssets.deletedAt)));
    await Promise.all(rows.map((row) => db.update(mediaAssets).set({ tagsJson: JSON.stringify(Array.from(new Set([...parseTags(row.tagsJson), tag]))), updatedAt: new Date() }).where(eq(mediaAssets.id, row.id))));
    return c.json({ data: rows.map((row) => ({ id: row.id })) });
  })
  .delete("/:id", verifyAuth(), zValidator("param", z.object({ id: z.string() })), async (c) => {
    const userId = getUserId(c);
    if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const { id } = c.req.valid("param");
    const [data] = await db.update(mediaAssets).set({ deletedAt: new Date(), updatedAt: new Date() }).where(and(eq(mediaAssets.id, id), eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt))).returning({ id: mediaAssets.id });
    if (!data) return c.json({ error: "Not found" }, 404);
    return c.json({ data });
  });

const parseTags = (value: string | null) => {
  try { return JSON.parse(value || "[]") as string[]; } catch { return []; }
};

const serializeAsset = (asset: typeof mediaAssets.$inferSelect) => ({ ...asset, tags: parseTags(asset.tagsJson) });

export default app;
