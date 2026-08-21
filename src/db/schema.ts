import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  jsonb,
  numeric,
  uniqueIndex,
  index,
  foreignKey,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"
 
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"), 
});

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  workspacesOwned: many(workspaces, { relationName: "workspaceOwner" }),
  workspaceMemberships: many(workspaceMembers),
  brands: many(brands),
  categories: many(categories),
  products: many(products),
  mediaAssets: many(mediaAssets),
  marketSignals: many(marketSignals),
  campaigns: many(campaigns),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const projects = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  json: text("json").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  isTemplate: boolean("isTemplate"),
  isPro: boolean("isPro"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const projectsInsertSchema = createInsertSchema(projects);

export const subscriptions = pgTable("subscription", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade"
    }),
  subscriptionId: text("subscriptionId").notNull(),
  customerId: text("customerId").notNull(),
  priceId: text("priceId").notNull(),
  status: text("status").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

// ---------------------------------------------------------------------------
// Multi-tenant commerce catalog, media library and campaign workspace.
// `userId` is the mandatory ownership boundary. `workspaceId` is optional so
// existing personal users work immediately, while shared workspaces can be
// enabled without a later data migration. API queries must always scope by
// authenticated user/workspace; foreign keys alone cannot enforce that scope.
// ---------------------------------------------------------------------------
const id = () => crypto.randomUUID();
const now = () => new Date();

export const workspaces = pgTable("workspace", {
  id: text("id").primaryKey().$defaultFn(id),
  ownerId: text("ownerId").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  logoMediaId: text("logoMediaId"),
  settingsJson: jsonb("settingsJson").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
  archivedAt: timestamp("archivedAt", { mode: "date" }),
}, (table) => ({
  ownerSlugUnique: uniqueIndex("workspace_owner_slug_unique").on(table.ownerId, table.slug),
  ownerIndex: index("workspace_owner_idx").on(table.ownerId),
}));

export const workspaceMembers = pgTable("workspace_member", {
  workspaceId: text("workspaceId").notNull().references(() => workspaces.id, { onDelete: "cascade" }),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("member"), // owner | admin | editor | member | viewer
  invitedByUserId: text("invitedByUserId").references(() => users.id, { onDelete: "set null" }),
  joinedAt: timestamp("joinedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({
  pk: primaryKey({ columns: [table.workspaceId, table.userId] }),
  userIndex: index("workspace_member_user_idx").on(table.userId),
}));

// Media library ----------------------------------------------------------------
export const mediaFolders = pgTable("media_folder", {
  id: text("id").primaryKey().$defaultFn(id),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  parentId: text("parentId"),
  name: text("name").notNull(),
  path: text("path").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({
  tenantPathUnique: uniqueIndex("media_folder_tenant_path_unique").on(table.userId, table.path),
  tenantIndex: index("media_folder_tenant_idx").on(table.userId, table.workspaceId),
  parentIndex: index("media_folder_parent_idx").on(table.parentId),
  parentForeignKey: foreignKey({ columns: [table.parentId], foreignColumns: [table.id], name: "media_folder_parentId_media_folder_id_fk" }).onDelete("cascade"),
}));

export const mediaAssets = pgTable("media_asset", {
  id: text("id").primaryKey().$defaultFn(id),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  createdByUserId: text("createdByUserId").references(() => users.id, { onDelete: "set null" }),
  originalFileName: text("originalFileName").notNull(),
  displayName: text("displayName").notNull(),
  altText: text("altText"),
  caption: text("caption"),
  mediaType: text("mediaType").notNull(), // image | video | audio | document | archive
  mimeType: text("mimeType").notNull(),
  extension: text("extension"),
  byteSize: integer("byteSize").notNull(),
  width: integer("width"),
  height: integer("height"),
  durationMs: integer("durationMs"),
  checksumSha256: text("checksumSha256"),
  storageProvider: text("storageProvider").notNull(), // uploadthing | r2 | s3 | external
  storageBucket: text("storageBucket"),
  storageKey: text("storageKey"),
  sourceUrl: text("sourceUrl"),
  publicUrl: text("publicUrl"),
  thumbnailUrl: text("thumbnailUrl"),
  status: text("status").notNull().default("ready"), // uploading | processing | ready | failed | archived
  visibility: text("visibility").notNull().default("private"), // private | workspace | public
  aiGenerated: boolean("aiGenerated").notNull().default(false),
  aiProvider: text("aiProvider"),
  aiModel: text("aiModel"),
  generationPrompt: text("generationPrompt"),
  generationMetadataJson: jsonb("generationMetadataJson").$type<Record<string, unknown>>().notNull().default({}),
  metadataJson: jsonb("metadataJson").$type<Record<string, unknown>>().notNull().default({}),
  deletedAt: timestamp("deletedAt", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({
  tenantIndex: index("media_asset_tenant_idx").on(table.userId, table.workspaceId, table.status),
  checksumIndex: index("media_asset_checksum_idx").on(table.userId, table.checksumSha256),
  typeIndex: index("media_asset_type_idx").on(table.userId, table.mediaType),
}));

export const mediaAssetFolders = pgTable("media_asset_folder", {
  mediaAssetId: text("mediaAssetId").notNull().references(() => mediaAssets.id, { onDelete: "cascade" }),
  folderId: text("folderId").notNull().references(() => mediaFolders.id, { onDelete: "cascade" }),
  addedAt: timestamp("addedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ pk: primaryKey({ columns: [table.mediaAssetId, table.folderId] }) }));

export const mediaDerivatives = pgTable("media_derivative", {
  id: text("id").primaryKey().$defaultFn(id),
  mediaAssetId: text("mediaAssetId").notNull().references(() => mediaAssets.id, { onDelete: "cascade" }),
  derivativeType: text("derivativeType").notNull(), // thumbnail | webp | resized | subtitle | transcript
  url: text("url").notNull(),
  mimeType: text("mimeType"),
  width: integer("width"),
  height: integer("height"),
  byteSize: integer("byteSize"),
  metadataJson: jsonb("metadataJson").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ assetTypeUnique: uniqueIndex("media_derivative_asset_type_unique").on(table.mediaAssetId, table.derivativeType) }));

// Product catalog -------------------------------------------------------------
export const categories = pgTable("category", {
  id: text("id").primaryKey().$defaultFn(id),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  parentId: text("parentId"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  imageMediaId: text("imageMediaId").references(() => mediaAssets.id, { onDelete: "set null" }),
  icon: text("icon"),
  sortOrder: integer("sortOrder").notNull().default(0),
  status: text("status").notNull().default("active"),
  metadataJson: jsonb("metadataJson").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
  archivedAt: timestamp("archivedAt", { mode: "date" }),
}, (table) => ({
  tenantSlugUnique: uniqueIndex("category_tenant_slug_unique").on(table.userId, table.slug),
  tenantIndex: index("category_tenant_idx").on(table.userId, table.workspaceId, table.status),
  parentIndex: index("category_parent_idx").on(table.parentId),
  parentForeignKey: foreignKey({ columns: [table.parentId], foreignColumns: [table.id], name: "category_parentId_category_id_fk" }).onDelete("set null"),
}));

export const brands = pgTable("brand", {
  id: text("id").primaryKey().$defaultFn(id),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  legalName: text("legalName"),
  description: text("description"),
  websiteUrl: text("websiteUrl"),
  toneOfVoice: text("toneOfVoice"),
  primaryColor: text("primaryColor"),
  secondaryColor: text("secondaryColor"),
  brandGuidelinesUrl: text("brandGuidelinesUrl"),
  logoMediaId: text("logoMediaId").references(() => mediaAssets.id, { onDelete: "set null" }),
  coverMediaId: text("coverMediaId").references(() => mediaAssets.id, { onDelete: "set null" }),
  status: text("status").notNull().default("active"),
  settingsJson: jsonb("settingsJson").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
  archivedAt: timestamp("archivedAt", { mode: "date" }),
}, (table) => ({
  tenantSlugUnique: uniqueIndex("brand_tenant_slug_unique").on(table.userId, table.slug),
  tenantIndex: index("brand_tenant_idx").on(table.userId, table.workspaceId, table.status),
}));

export const tags = pgTable("tag", {
  id: text("id").primaryKey().$defaultFn(id),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(), slug: text("slug").notNull(), color: text("color"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ tenantSlugUnique: uniqueIndex("tag_tenant_slug_unique").on(table.userId, table.slug) }));

export const products = pgTable("product", {
  id: text("id").primaryKey().$defaultFn(id),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  brandId: text("brandId").references(() => brands.id, { onDelete: "set null" }),
  categoryId: text("categoryId").references(() => categories.id, { onDelete: "set null" }),
  name: text("name").notNull(), slug: text("slug").notNull(), sku: text("sku").notNull(),
  barcode: text("barcode"), status: text("status").notNull().default("draft"), // draft | active | archived
  shortDescription: text("shortDescription"), description: text("description"),
  usp: text("usp"), targetAudience: text("targetAudience"), targetMarketsJson: jsonb("targetMarketsJson").$type<string[]>().notNull().default([]),
  countryOfOrigin: text("countryOfOrigin"), taxCode: text("taxCode"),
  weightGrams: integer("weightGrams"), lengthMm: integer("lengthMm"), widthMm: integer("widthMm"), heightMm: integer("heightMm"),
  seoTitle: text("seoTitle"), seoDescription: text("seoDescription"),
  metadataJson: jsonb("metadataJson").$type<Record<string, unknown>>().notNull().default({}),
  publishedAt: timestamp("publishedAt", { mode: "date" }), archivedAt: timestamp("archivedAt", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({
  tenantSlugUnique: uniqueIndex("product_tenant_slug_unique").on(table.userId, table.slug),
  tenantSkuUnique: uniqueIndex("product_tenant_sku_unique").on(table.userId, table.sku),
  tenantStatusIndex: index("product_tenant_status_idx").on(table.userId, table.workspaceId, table.status),
  brandIndex: index("product_brand_idx").on(table.brandId), categoryIndex: index("product_category_idx").on(table.categoryId),
}));

export const productVariants = pgTable("product_variant", {
  id: text("id").primaryKey().$defaultFn(id), productId: text("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  sku: text("sku").notNull(), barcode: text("barcode"), name: text("name").notNull(),
  price: numeric("price", { precision: 14, scale: 2 }).notNull(), compareAtPrice: numeric("compareAtPrice", { precision: 14, scale: 2 }), costPrice: numeric("costPrice", { precision: 14, scale: 2 }), currency: text("currency").notNull().default("VND"),
  inventoryQuantity: integer("inventoryQuantity").notNull().default(0), inventoryPolicy: text("inventoryPolicy").notNull().default("deny"),
  weightGrams: integer("weightGrams"), status: text("status").notNull().default("active"), position: integer("position").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ productSkuUnique: uniqueIndex("product_variant_product_sku_unique").on(table.productId, table.sku), productIndex: index("product_variant_product_idx").on(table.productId) }));

export const productClaims = pgTable("product_claim", {
  id: text("id").primaryKey().$defaultFn(id), productId: text("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  claimType: text("claimType").notNull(), // required | restricted | approved | substantiation
  claimText: text("claimText").notNull(), market: text("market"), language: text("language").notNull().default("vi"),
  evidenceMediaId: text("evidenceMediaId").references(() => mediaAssets.id, { onDelete: "set null" }), evidenceUrl: text("evidenceUrl"),
  status: text("status").notNull().default("active"), validFrom: timestamp("validFrom", { mode: "date" }), validUntil: timestamp("validUntil", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ productIndex: index("product_claim_product_idx").on(table.productId, table.claimType, table.status) }));

export const productMedia = pgTable("product_media", {
  productId: text("productId").notNull().references(() => products.id, { onDelete: "cascade" }), mediaAssetId: text("mediaAssetId").notNull().references(() => mediaAssets.id, { onDelete: "restrict" }),
  variantId: text("variantId").references(() => productVariants.id, { onDelete: "cascade" }), role: text("role").notNull().default("gallery"), position: integer("position").notNull().default(0), isPrimary: boolean("isPrimary").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ pk: primaryKey({ columns: [table.productId, table.mediaAssetId] }), productIndex: index("product_media_product_idx").on(table.productId, table.position) }));

export const productTags = pgTable("product_tag", { productId: text("productId").notNull().references(() => products.id, { onDelete: "cascade" }), tagId: text("tagId").notNull().references(() => tags.id, { onDelete: "cascade" }) }, (table) => ({ pk: primaryKey({ columns: [table.productId, table.tagId] }) }));

// Signals and campaigns -------------------------------------------------------
export const marketSignals = pgTable("market_signal", {
  id: text("id").primaryKey().$defaultFn(id), userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }), workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  categoryId: text("categoryId").references(() => categories.id, { onDelete: "set null" }), title: text("title").notNull(), signalType: text("signalType").notNull(), market: text("market").notNull(), language: text("language").notNull().default("vi"),
  summary: text("summary").notNull(), trendKeywordsJson: jsonb("trendKeywordsJson").$type<string[]>().notNull().default([]), painPointsJson: jsonb("painPointsJson").$type<string[]>().notNull().default([]), recommendedAction: text("recommendedAction"),
  sourceName: text("sourceName").notNull(), sourceUrl: text("sourceUrl"), sourceMediaId: text("sourceMediaId").references(() => mediaAssets.id, { onDelete: "set null" }), sourceDataJson: jsonb("sourceDataJson").$type<Record<string, unknown>>().notNull().default({}),
  confidence: text("confidence").notNull().default("medium"), status: text("status").notNull().default("draft"), capturedAt: timestamp("capturedAt", { mode: "date" }).notNull(), expiresAt: timestamp("expiresAt", { mode: "date" }), verifiedByUserId: text("verifiedByUserId").references(() => users.id, { onDelete: "set null" }), verifiedAt: timestamp("verifiedAt", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ tenantIndex: index("market_signal_tenant_idx").on(table.userId, table.workspaceId, table.market, table.status), categoryIndex: index("market_signal_category_idx").on(table.categoryId), expiryIndex: index("market_signal_expiry_idx").on(table.expiresAt) }));

export const campaigns = pgTable("campaign", {
  id: text("id").primaryKey().$defaultFn(id), userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }), workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  projectId: text("projectId").references(() => projects.id, { onDelete: "set null" }), productId: text("productId").notNull().references(() => products.id, { onDelete: "restrict" }),
  name: text("name").notNull(), code: text("code"), status: text("status").notNull().default("draft"), objective: text("objective"), targetMarket: text("targetMarket").notNull().default("VN"), targetAudience: text("targetAudience"), language: text("language").notNull().default("vi"),
  startAt: timestamp("startAt", { mode: "date" }), endAt: timestamp("endAt", { mode: "date" }), budgetAmount: numeric("budgetAmount", { precision: 14, scale: 2 }), budgetCurrency: text("budgetCurrency").notNull().default("VND"),
  briefSnapshotJson: jsonb("briefSnapshotJson").$type<Record<string, unknown>>().notNull().default({}), productSnapshotJson: jsonb("productSnapshotJson").$type<Record<string, unknown>>().notNull().default({}), brandSnapshotJson: jsonb("brandSnapshotJson").$type<Record<string, unknown>>().notNull().default({}), positioningJson: jsonb("positioningJson").$type<Record<string, unknown>>().notNull().default({}),
  approvedByUserId: text("approvedByUserId").references(() => users.id, { onDelete: "set null" }), approvedAt: timestamp("approvedAt", { mode: "date" }), archivedAt: timestamp("archivedAt", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ tenantIndex: index("campaign_tenant_idx").on(table.userId, table.workspaceId, table.status), productIndex: index("campaign_product_idx").on(table.productId), tenantCodeUnique: uniqueIndex("campaign_tenant_code_unique").on(table.userId, table.code) }));

export const campaignSignals = pgTable("campaign_signal", { campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), signalId: text("signalId").notNull().references(() => marketSignals.id, { onDelete: "restrict" }), relevanceNote: text("relevanceNote"), snapshotJson: jsonb("snapshotJson").$type<Record<string, unknown>>().notNull().default({}), addedAt: timestamp("addedAt", { mode: "date" }).notNull().$defaultFn(now) }, (table) => ({ pk: primaryKey({ columns: [table.campaignId, table.signalId] }) }));

export const campaignBriefVersions = pgTable("campaign_brief_version", {
  id: text("id").primaryKey().$defaultFn(id), campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), version: integer("version").notNull(), briefJson: jsonb("briefJson").$type<Record<string, unknown>>().notNull(), changeNote: text("changeNote"), createdByUserId: text("createdByUserId").references(() => users.id, { onDelete: "set null" }), createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ campaignVersionUnique: uniqueIndex("campaign_brief_version_unique").on(table.campaignId, table.version) }));

export const creativeRoutes = pgTable("creative_route", {
  id: text("id").primaryKey().$defaultFn(id), campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), routeType: text("routeType").notNull(), routeName: text("routeName").notNull(), status: text("status").notNull().default("draft"),
  hookIdea: text("hookIdea").notNull(), visualDirection: text("visualDirection").notNull(), messageAngle: text("messageAngle").notNull(), suggestedPlatformsJson: jsonb("suggestedPlatformsJson").$type<string[]>().notNull().default([]), targetMetric: text("targetMetric"),
  adCopyJson: jsonb("adCopyJson").$type<Record<string, unknown>>().notNull().default({}), videoStoryboardJson: jsonb("videoStoryboardJson").$type<Record<string, unknown>>().notNull().default({}), generationMetadataJson: jsonb("generationMetadataJson").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ campaignTypeUnique: uniqueIndex("creative_route_campaign_type_unique").on(table.campaignId, table.routeType), campaignIndex: index("creative_route_campaign_idx").on(table.campaignId, table.status) }));

export const campaignContentItems = pgTable("campaign_content_item", {
  id: text("id").primaryKey().$defaultFn(id), campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), routeId: text("routeId").references(() => creativeRoutes.id, { onDelete: "cascade" }), contentType: text("contentType").notNull(), channel: text("channel"), locale: text("locale").notNull().default("vi-VN"), title: text("title"), body: text("body"), cta: text("cta"), hashtagsJson: jsonb("hashtagsJson").$type<string[]>().notNull().default([]), structuredContentJson: jsonb("structuredContentJson").$type<Record<string, unknown>>().notNull().default({}),
  status: text("status").notNull().default("draft"), version: integer("version").notNull().default(1), generatedBy: text("generatedBy"), generationMetadataJson: jsonb("generationMetadataJson").$type<Record<string, unknown>>().notNull().default({}), approvedByUserId: text("approvedByUserId").references(() => users.id, { onDelete: "set null" }), approvedAt: timestamp("approvedAt", { mode: "date" }), createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ campaignIndex: index("campaign_content_campaign_idx").on(table.campaignId, table.contentType, table.status), routeIndex: index("campaign_content_route_idx").on(table.routeId) }));

export const campaignAssets = pgTable("campaign_asset", {
  id: text("id").primaryKey().$defaultFn(id), campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), routeId: text("routeId").references(() => creativeRoutes.id, { onDelete: "cascade" }), mediaAssetId: text("mediaAssetId").references(() => mediaAssets.id, { onDelete: "set null" }), assetType: text("assetType").notNull(), title: text("title").notNull(), externalUrl: text("externalUrl"), aspectRatio: text("aspectRatio"), width: integer("width"), height: integer("height"),
  promptUsed: text("promptUsed"), modelUsed: text("modelUsed"), status: text("status").notNull().default("planned"), placement: text("placement"), metadataJson: jsonb("metadataJson").$type<Record<string, unknown>>().notNull().default({}), createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ campaignIndex: index("campaign_asset_campaign_idx").on(table.campaignId, table.assetType, table.status), routeIndex: index("campaign_asset_route_idx").on(table.routeId) }));

export const campaignJobs = pgTable("campaign_job", {
  id: text("id").primaryKey().$defaultFn(id), campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), jobType: text("jobType").notNull(), provider: text("provider"), model: text("model"), status: text("status").notNull().default("queued"), externalJobId: text("externalJobId"), inputJson: jsonb("inputJson").$type<Record<string, unknown>>().notNull().default({}), outputJson: jsonb("outputJson").$type<Record<string, unknown>>().notNull().default({}), errorCode: text("errorCode"), errorMessage: text("errorMessage"), startedAt: timestamp("startedAt", { mode: "date" }), completedAt: timestamp("completedAt", { mode: "date" }), createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ campaignStatusIndex: index("campaign_job_campaign_status_idx").on(table.campaignId, table.status), externalJobUnique: uniqueIndex("campaign_job_external_id_unique").on(table.provider, table.externalJobId) }));

export const abTestPlans = pgTable("ab_test_plan", {
  id: text("id").primaryKey().$defaultFn(id), campaignId: text("campaignId").notNull().references(() => campaigns.id, { onDelete: "cascade" }), name: text("name").notNull(), status: text("status").notNull().default("draft"), hypothesis: text("hypothesis").notNull(), routeAId: text("routeAId").references(() => creativeRoutes.id, { onDelete: "set null" }), routeBId: text("routeBId").references(() => creativeRoutes.id, { onDelete: "set null" }), testVariable: text("testVariable").notNull(), targetMetricsJson: jsonb("targetMetricsJson").$type<Record<string, unknown>>().notNull().default({}), expectedLearning: text("expectedLearning"), performanceAdviceJson: jsonb("performanceAdviceJson").$type<Record<string, unknown>>().notNull().default({}), startAt: timestamp("startAt", { mode: "date" }), endAt: timestamp("endAt", { mode: "date" }), createdAt: timestamp("createdAt", { mode: "date" }).notNull().$defaultFn(now), updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().$defaultFn(now),
}, (table) => ({ campaignIndex: index("ab_test_plan_campaign_idx").on(table.campaignId, table.status) }));

// Core navigational relations used by Drizzle's relational query API.
export const productsRelations = relations(products, ({ one, many }) => ({ brand: one(brands, { fields: [products.brandId], references: [brands.id] }), category: one(categories, { fields: [products.categoryId], references: [categories.id] }), variants: many(productVariants), claims: many(productClaims), media: many(productMedia), campaigns: many(campaigns) }));
export const campaignsRelations = relations(campaigns, ({ one, many }) => ({ product: one(products, { fields: [campaigns.productId], references: [products.id] }), creativeRoutes: many(creativeRoutes), assets: many(campaignAssets), contentItems: many(campaignContentItems), signals: many(campaignSignals), briefVersions: many(campaignBriefVersions), jobs: many(campaignJobs), abTestPlans: many(abTestPlans) }));

export const mediaAssetsInsertSchema = createInsertSchema(mediaAssets);
export const productsInsertSchema = createInsertSchema(products);
