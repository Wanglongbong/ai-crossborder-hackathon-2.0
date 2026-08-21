import { and, asc, desc, eq, ilike, inArray, isNull } from "drizzle-orm";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { campaignProducts, campaigns, products, projects } from "@/db/schema";

const productInput = z.object({
  name: z.string().min(1).max(180), sku: z.string().min(1).max(80), category: z.string().max(120).default("Uncategorized"),
  brand: z.string().max(120).optional(), imageUrl: z.string().url().or(z.literal("")).optional(), priceCents: z.number().int().nonnegative().default(0),
  currency: z.string().length(3).default("USD"), promotion: z.string().max(500).optional(), description: z.string().max(5000).optional(),
  sellingPoints: z.array(z.string()).max(20).default([]), requiredClaims: z.array(z.string()).max(30).default([]), restrictedClaims: z.array(z.string()).max(30).default([]),
  audience: z.string().max(1000).optional(), targetMarket: z.string().max(500).optional(), status: z.enum(["draft", "active", "archived"]).default("draft"), readiness: z.number().int().min(0).max(100).default(0),
});
const getUserId = (c: any) => c.get("authUser")?.token?.sub as string | undefined;
const json = (value: string | null) => { try { return JSON.parse(value || "[]") as string[]; } catch { return []; } };
const serialize = (row: typeof products.$inferSelect) => ({ ...row, sellingPoints: json(row.sellingPointsJson), requiredClaims: json(row.requiredClaimsJson), restrictedClaims: json(row.restrictedClaimsJson) });
const values = (input: z.infer<typeof productInput>) => {
  const { sellingPoints, requiredClaims, restrictedClaims, ...product } = input;
  return { ...product, imageUrl: input.imageUrl || null, sellingPointsJson: JSON.stringify(sellingPoints), requiredClaimsJson: JSON.stringify(requiredClaims), restrictedClaimsJson: JSON.stringify(restrictedClaims) };
};

const app = new Hono()
  .get("/", verifyAuth(), zValidator("query", z.object({ query: z.string().optional(), status: z.enum(["all", "draft", "active", "archived"]).default("all"), sort: z.enum(["newest", "oldest", "name", "readiness"]).default("newest") })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401);
    const input = c.req.valid("query"); const conditions = [eq(products.userId, userId), isNull(products.deletedAt)];
    if (input.query) conditions.push(ilike(products.name, `%${input.query}%`)); if (input.status !== "all") conditions.push(eq(products.status, input.status));
    const order = input.sort === "oldest" ? asc(products.createdAt) : input.sort === "name" ? asc(products.name) : input.sort === "readiness" ? desc(products.readiness) : desc(products.updatedAt);
    const data = await db.select().from(products).where(and(...conditions)).orderBy(order); return c.json({ data: data.map(serialize) });
  })
  .post("/", verifyAuth(), zValidator("json", productInput), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const input = c.req.valid("json");
    const duplicate = await db.select({ id: products.id }).from(products).where(and(eq(products.userId, userId), eq(products.sku, input.sku), isNull(products.deletedAt)));
    if (duplicate.length) return c.json({ error: "SKU already exists" }, 409); const now = new Date();
    const [data] = await db.insert(products).values({ ...values(input), userId, createdAt: now, updatedAt: now } as any).returning(); return c.json({ data: serialize(data) }, 201);
  })
  .post("/bulk-upsert", verifyAuth(), zValidator("json", z.object({ mode: z.enum(["skip", "update"]), rows: z.array(productInput).min(1).max(1000) })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { rows, mode } = c.req.valid("json"); let created = 0; let updated = 0; let skipped = 0;
    for (const input of rows) { const [existing] = await db.select().from(products).where(and(eq(products.userId, userId), eq(products.sku, input.sku), isNull(products.deletedAt)));
      if (existing && mode === "skip") { skipped++; continue; } const now = new Date();
      if (existing) { await db.update(products).set({ ...values(input), updatedAt: now } as any).where(eq(products.id, existing.id)); updated++; }
      else { await db.insert(products).values({ ...values(input), userId, createdAt: now, updatedAt: now } as any); created++; }
    } return c.json({ data: { created, updated, skipped } });
  })
  .post("/:id/campaign", verifyAuth(), zValidator("param", z.object({ id: z.string() })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { id } = c.req.valid("param"); const [product] = await db.select().from(products).where(and(eq(products.id, id), eq(products.userId, userId), isNull(products.deletedAt)));
    if (!product) return c.json({ error: "Not found" }, 404); const now = new Date(); const [project] = await db.insert(projects).values({ name: `${product.name} Campaign`, userId, json: "{\"version\":\"5.3.0\",\"objects\":[]}", width: 1080, height: 1920, createdAt: now, updatedAt: now }).returning();
    const [campaign] = await db.insert(campaigns).values({ projectId: project.id, userId, productName: product.name, category: product.category || "Uncategorized", pricePromo: product.promotion, targetMarket: product.targetMarket, requiredClaims: product.requiredClaimsJson, restrictedClaims: product.restrictedClaimsJson, status: "draft", createdAt: now, updatedAt: now }).returning();
    await db.insert(campaignProducts).values({ campaignId: campaign.id, productId: product.id, createdAt: now }); return c.json({ data: { projectId: project.id, campaignId: campaign.id } }, 201);
  })
  .patch("/:id", verifyAuth(), zValidator("param", z.object({ id: z.string() })), zValidator("json", productInput.partial()), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { id } = c.req.valid("param"); const input = c.req.valid("json");
    const patch: any = { ...input, updatedAt: new Date() }; if (input.sellingPoints) patch.sellingPointsJson = JSON.stringify(input.sellingPoints); if (input.requiredClaims) patch.requiredClaimsJson = JSON.stringify(input.requiredClaims); if (input.restrictedClaims) patch.restrictedClaimsJson = JSON.stringify(input.restrictedClaims); delete patch.sellingPoints; delete patch.requiredClaims; delete patch.restrictedClaims;
    const [data] = await db.update(products).set(patch).where(and(eq(products.id, id), eq(products.userId, userId), isNull(products.deletedAt))).returning(); if (!data) return c.json({ error: "Not found" }, 404); return c.json({ data: serialize(data) });
  })
  .post("/bulk", verifyAuth(), zValidator("json", z.object({ ids: z.array(z.string()).min(1).max(500), action: z.enum(["archive", "activate", "trash"]) })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { ids, action } = c.req.valid("json"); const patch = action === "trash" ? { deletedAt: new Date(), updatedAt: new Date() } : { status: action === "archive" ? "archived" : "active", updatedAt: new Date() };
    const data = await db.update(products).set(patch).where(and(eq(products.userId, userId), inArray(products.id, ids), isNull(products.deletedAt))).returning({ id: products.id }); return c.json({ data });
  })
  .delete("/:id", verifyAuth(), zValidator("param", z.object({ id: z.string() })), async (c) => {
    const userId = getUserId(c); if (!userId) return c.json({ error: "Unauthorized" }, 401); const { id } = c.req.valid("param"); const [data] = await db.update(products).set({ deletedAt: new Date(), updatedAt: new Date() }).where(and(eq(products.id, id), eq(products.userId, userId), isNull(products.deletedAt))).returning({ id: products.id }); if (!data) return c.json({ error: "Not found" }, 404); return c.json({ data });
  });

export default app;
