import { and, asc, desc, eq, ilike, inArray, isNull, sql } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { campaigns, products, projects } from "@/db/schema";

const productInput = z.object({
  name: z.string().min(1).max(180), sku: z.string().min(1).max(80), category: z.string().max(120).default("Uncategorized"),
  brand: z.string().max(120).optional(), imageUrl: z.string().url().or(z.literal("")).optional(), priceCents: z.number().int().nonnegative().default(0),
  currency: z.string().length(3).default("USD"), promotion: z.string().max(500).optional(), description: z.string().max(5000).optional(),
  sellingPoints: z.array(z.string()).max(20).default([]), requiredClaims: z.array(z.string()).max(30).default([]), restrictedClaims: z.array(z.string()).max(30).default([]),
  audience: z.string().max(1000).optional(), targetMarket: z.string().max(500).optional(), status: z.enum(["draft", "active", "archived"]).default("draft"), readiness: z.number().int().min(0).max(100).default(0),
});

type ProductInput = z.infer<typeof productInput>;
type ProductMetadata = Record<string, unknown> & {
  category?: string; brand?: string; imageUrl?: string; priceCents?: number; currency?: string; promotion?: string;
  sellingPoints: string[]; requiredClaims: string[]; restrictedClaims: string[]; readiness?: number;
};

const getUserId = (c: any) => c.get("authUser")?.token?.sub as string | undefined;
const stringList = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
const metadata = (value: Record<string, unknown> | null): ProductMetadata => ({
  ...(value || {}),
  sellingPoints: stringList(value?.sellingPoints), requiredClaims: stringList(value?.requiredClaims), restrictedClaims: stringList(value?.restrictedClaims),
});
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120) || "product";

const toMetadata = (input: Partial<ProductInput>, current: ProductMetadata = metadata(null)): ProductMetadata => ({
  ...current,
  ...(input.category !== undefined ? { category: input.category } : {}), ...(input.brand !== undefined ? { brand: input.brand } : {}),
  ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl || undefined } : {}), ...(input.priceCents !== undefined ? { priceCents: input.priceCents } : {}),
  ...(input.currency !== undefined ? { currency: input.currency } : {}), ...(input.promotion !== undefined ? { promotion: input.promotion } : {}),
  ...(input.sellingPoints !== undefined ? { sellingPoints: input.sellingPoints } : {}), ...(input.requiredClaims !== undefined ? { requiredClaims: input.requiredClaims } : {}),
  ...(input.restrictedClaims !== undefined ? { restrictedClaims: input.restrictedClaims } : {}), ...(input.readiness !== undefined ? { readiness: input.readiness } : {}),
});

const serialize = (row: typeof products.$inferSelect) => {
  const meta = metadata(row.metadataJson);
  return { ...row, category: meta.category || "Uncategorized", brand: meta.brand, imageUrl: meta.imageUrl,
    priceCents: typeof meta.priceCents === "number" ? meta.priceCents : 0, currency: typeof meta.currency === "string" ? meta.currency : "USD",
    promotion: meta.promotion, sellingPoints: meta.sellingPoints, requiredClaims: meta.requiredClaims, restrictedClaims: meta.restrictedClaims,
    audience: row.targetAudience, targetMarket: row.targetMarketsJson.join(", "), readiness: typeof meta.readiness === "number" ? meta.readiness : 0 };
};

const createValues = (input: ProductInput, userId: string) => ({
  userId, name: input.name, slug: `${slugify(input.name)}-${slugify(input.sku)}`, sku: input.sku, status: input.status,
  description: input.description, usp: input.sellingPoints[0], targetAudience: input.audience,
  targetMarketsJson: input.targetMarket ? input.targetMarket.split(",").map((item) => item.trim()).filter(Boolean) : [], metadataJson: toMetadata(input),
});

const app = new Hono()
  .get("/", verifyAuth(), zValidator("query", z.object({ query: z.string().optional(), status: z.enum(["all", "draft", "active", "archived"]).default("all"), sort: z.enum(["newest", "oldest", "name", "readiness"]).default("newest") })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const input = c.req.valid("query"); const conditions = [eq(products.userId, userId), isNull(products.archivedAt)];
    if (input.query) conditions.push(ilike(products.name, `%${input.query}%`)); if (input.status !== "all") conditions.push(eq(products.status, input.status));
    const readinessOrder = sql`coalesce((${products.metadataJson}->>'readiness')::int, 0)`;
    const order = input.sort === "oldest" ? asc(products.createdAt) : input.sort === "name" ? asc(products.name) : input.sort === "readiness" ? desc(readinessOrder) : desc(products.updatedAt);
    const data = await db.select().from(products).where(and(...conditions)).orderBy(order); return c.json({ data: data.map(serialize) });
  })
  .post("/", verifyAuth(), zValidator("json", productInput), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const input = c.req.valid("json");
    const duplicate = await db.select({ id: products.id }).from(products).where(and(eq(products.userId, userId), eq(products.sku, input.sku), isNull(products.archivedAt)));
    if (duplicate.length) return c.json({ error: "SKU already exists" }, 409);
    const [data] = await db.insert(products).values(createValues(input, userId)).returning(); return c.json({ data: serialize(data) }, 201);
  })
  .post("/bulk-upsert", verifyAuth(), zValidator("json", z.object({ mode: z.enum(["skip", "update"]), rows: z.array(productInput).min(1).max(1000) })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { rows, mode } = c.req.valid("json"); let created = 0; let updated = 0; let skipped = 0;
    for (const input of rows) {
      const [existing] = await db.select().from(products).where(and(eq(products.userId, userId), eq(products.sku, input.sku), isNull(products.archivedAt)));
      if (existing && mode === "skip") { skipped++; continue; }
      if (existing) { await db.update(products).set({ ...createValues(input, userId), updatedAt: new Date() }).where(eq(products.id, existing.id)); updated++; }
      else { await db.insert(products).values(createValues(input, userId)); created++; }
    }
    return c.json({ data: { created, updated, skipped } });
  })
  .post("/:id/campaign", verifyAuth(), zValidator("param", z.object({ id: z.string() })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { id } = c.req.valid("param");
    const [product] = await db.select().from(products).where(and(eq(products.id, id), eq(products.userId, userId), isNull(products.archivedAt)));
    if (!product) return c.json({ error: "Not found" }, 404);
    const wireProduct = serialize(product); const now = new Date();
    const [project] = await db.insert(projects).values({ name: `${product.name} Campaign`, userId, json: "{\"version\":\"5.3.0\",\"objects\":[]}", width: 1080, height: 1920, createdAt: now, updatedAt: now }).returning();
    const [campaign] = await db.insert(campaigns).values({ projectId: project.id, productId: product.id, userId, name: `${product.name} Campaign`, targetMarket: wireProduct.targetMarket || "VN", targetAudience: product.targetAudience, productSnapshotJson: wireProduct, briefSnapshotJson: { requiredClaims: wireProduct.requiredClaims, restrictedClaims: wireProduct.restrictedClaims, promotion: wireProduct.promotion }, status: "draft", createdAt: now, updatedAt: now }).returning();
    return c.json({ data: { projectId: project.id, campaignId: campaign.id } }, 201);
  })
  .patch("/:id", verifyAuth(), zValidator("param", z.object({ id: z.string() })), zValidator("json", productInput.partial()), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { id } = c.req.valid("param"); const input = c.req.valid("json");
    const [current] = await db.select().from(products).where(and(eq(products.id, id), eq(products.userId, userId), isNull(products.archivedAt)));
    if (!current) return c.json({ error: "Not found" }, 404);
    const patch = { ...(input.name !== undefined ? { name: input.name, slug: `${slugify(input.name)}-${slugify(input.sku || current.sku)}` } : {}),
      ...(input.sku !== undefined ? { sku: input.sku } : {}), ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}), ...(input.sellingPoints !== undefined ? { usp: input.sellingPoints[0] } : {}),
      ...(input.audience !== undefined ? { targetAudience: input.audience } : {}),
      ...(input.targetMarket !== undefined ? { targetMarketsJson: input.targetMarket.split(",").map((item) => item.trim()).filter(Boolean) } : {}),
      metadataJson: toMetadata(input, metadata(current.metadataJson)), updatedAt: new Date() };
    const [data] = await db.update(products).set(patch).where(eq(products.id, id)).returning(); return c.json({ data: serialize(data) });
  })
  .post("/bulk", verifyAuth(), zValidator("json", z.object({ ids: z.array(z.string()).min(1).max(500), action: z.enum(["archive", "activate", "trash"]) })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { ids, action } = c.req.valid("json");
    const patch = action === "trash" ? { archivedAt: new Date(), status: "archived", updatedAt: new Date() } : { status: action === "archive" ? "archived" : "active", updatedAt: new Date() };
    const data = await db.update(products).set(patch).where(and(eq(products.userId, userId), inArray(products.id, ids), isNull(products.archivedAt))).returning({ id: products.id }); return c.json({ data });
  })
  .delete("/:id", verifyAuth(), zValidator("param", z.object({ id: z.string() })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { id } = c.req.valid("param");
    const [data] = await db.update(products).set({ archivedAt: new Date(), status: "archived", updatedAt: new Date() }).where(and(eq(products.id, id), eq(products.userId, userId), isNull(products.archivedAt))).returning({ id: products.id });
    if (!data) return c.json({ error: "Not found" }, 404); return c.json({ data });
  });

export default app;
