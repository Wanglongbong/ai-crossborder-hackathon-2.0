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
      if (input.query) conditions.push(ilike(mediaAssets.displayName, `%${input.query}%`));
      if (input.month) conditions.push(sql`to_char(${mediaAssets.createdAt}, 'YYYY-MM') = ${input.month}`);
      const order = input.sort === "oldest" ? asc(mediaAssets.createdAt) : input.sort === "name" ? asc(mediaAssets.displayName) : input.sort === "size" ? desc(mediaAssets.byteSize) : desc(mediaAssets.createdAt);
      const data = await db.select().from(mediaAssets).where(and(...conditions)).limit(input.limit).offset((input.page - 1) * input.limit).orderBy(order);
      return c.json({ data: data.map(serializeAsset), nextPage: data.length === input.limit ? input.page + 1 : null });
    },
  )
  .get("/filter-options", verifyAuth(), async (c) => {
    const userId = getUserId(c);
    if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const rows = await db.select({ createdAt: mediaAssets.createdAt, metadataJson: mediaAssets.metadataJson }).from(mediaAssets).where(and(eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt)));
    const months = Array.from(new Set(rows.map((row) => row.createdAt.toISOString().slice(0, 7)))).sort().reverse();
    const tags = Array.from(new Set(rows.flatMap((row) => readMetadata(row.metadataJson).tags))).sort();
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
    const { tags } = input;
    const now = new Date();
    const [data] = await db.insert(mediaAssets).values(toAssetValues(input, userId, tags, now)).returning();
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
      const [current] = await db.select().from(mediaAssets).where(and(eq(mediaAssets.id, id), eq(mediaAssets.userId, userId), isNull(mediaAssets.deletedAt)));
      if (!current) return c.json({ error: "Not found" }, 404);
      const metadata = readMetadata(current.metadataJson);
      const [data] = await db.update(mediaAssets).set({ displayName: input.name, altText: input.altText, caption: input.caption, metadataJson: input.tags ? { ...metadata, tags: input.tags } : undefined, updatedAt: new Date() }).where(eq(mediaAssets.id, id)).returning();
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
    const { tags } = input;
    const now = new Date();
    const [data] = await db.insert(mediaAssets).values(toAssetValues(input, userId, tags, now, id)).returning();
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
    await Promise.all(rows.map((row) => {
      const metadata = readMetadata(row.metadataJson);
      return db.update(mediaAssets).set({ metadataJson: { ...metadata, tags: Array.from(new Set([...metadata.tags, tag])) }, updatedAt: new Date() }).where(eq(mediaAssets.id, row.id));
    }));
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

type AssetMetadata = Record<string, unknown> & { tags: string[]; source?: string; parentAssetId?: string };

const readMetadata = (value: Record<string, unknown> | null): AssetMetadata => {
  const metadata = value || {};
  return {
    ...metadata,
    tags: Array.isArray(metadata.tags) ? metadata.tags.filter((tag): tag is string => typeof tag === "string") : [],
    source: typeof metadata.source === "string" ? metadata.source : undefined,
    parentAssetId: typeof metadata.parentAssetId === "string" ? metadata.parentAssetId : undefined,
  };
};

const toAssetValues = (input: z.infer<typeof assetInput>, userId: string, tags: string[], now: Date, parentAssetId?: string) => ({
  userId,
  createdByUserId: userId,
  originalFileName: input.name,
  displayName: input.name,
  altText: input.altText,
  caption: input.caption,
  mediaType: input.mediaType,
  mimeType: input.mimeType,
  extension: input.name.includes(".") ? input.name.split(".").pop()?.toLowerCase() : undefined,
  byteSize: input.sizeBytes,
  width: input.width,
  height: input.height,
  durationMs: input.durationSeconds === undefined ? undefined : input.durationSeconds * 1000,
  storageProvider: "r2",
  storageBucket: process.env.R2_BUCKET,
  storageKey: input.objectKey,
  publicUrl: input.url,
  visibility: "private",
  metadataJson: { tags, source: input.source || "Upload", ...(parentAssetId ? { parentAssetId } : {}) },
  createdAt: now,
  updatedAt: now,
});

const serializeAsset = (asset: typeof mediaAssets.$inferSelect) => {
  const metadata = readMetadata(asset.metadataJson);
  return {
    ...asset,
    parentAssetId: metadata.parentAssetId,
    name: asset.displayName,
    objectKey: asset.storageKey || "",
    url: asset.publicUrl || asset.sourceUrl || "",
    sizeBytes: asset.byteSize,
    durationSeconds: asset.durationMs === null ? undefined : Math.round(asset.durationMs / 1000),
    source: metadata.source || "Upload",
    tags: metadata.tags,
  };
};

export default app;
