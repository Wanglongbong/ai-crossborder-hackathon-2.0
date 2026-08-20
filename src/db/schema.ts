import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
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

// BytePlus BP-01 Commerce Campaign Launch Copilot Schemas
export const campaigns = pgTable("campaign", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("projectId")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productName: text("productName").notNull(),
  category: text("category").notNull(),
  pricePromo: text("pricePromo"),
  targetMarket: text("targetMarket").default("VN"),
  requiredClaims: text("requiredClaims"),
  restrictedClaims: text("restrictedClaims"),
  brandKitJson: text("brandKitJson"),
  marketSignalJson: text("marketSignalJson"),
  positioningJson: text("positioningJson"),
  status: text("status").default("draft"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const creativeRoutes = pgTable("creative_route", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaignId")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  routeType: text("routeType").notNull(), // "ROUTE_A" | "ROUTE_B"
  routeName: text("routeName").notNull(),
  hookIdea: text("hookIdea").notNull(),
  visualDirection: text("visualDirection").notNull(),
  messageAngle: text("messageAngle").notNull(),
  suggestedPlatform: text("suggestedPlatform").notNull(),
  adCopyJson: text("adCopyJson"),
  videoAssetUrl: text("videoAssetUrl"),
  videoStoryboardJson: text("videoStoryboardJson"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});

export const campaignAssets = pgTable("campaign_asset", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaignId")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  routeId: text("routeId").references(() => creativeRoutes.id, { onDelete: "cascade" }),
  assetType: text("assetType").notNull(), // "HERO_IMAGE" | "DETAIL_SKU" | "COLLECTION" | "MARKETPLACE_COVER" | "PROMO_BANNER"
  imageUrl: text("imageUrl").notNull(),
  aspectRatio: text("aspectRatio").default("1:1"),
  promptUsed: text("promptUsed"),
  modelUsed: text("modelUsed").default("Seedream 5.0 Pro"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});

export const abTestPlans = pgTable("ab_test_plan", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  campaignId: text("campaignId")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  hypothesis: text("hypothesis").notNull(),
  routeAOverview: text("routeAOverview").notNull(),
  routeBOverview: text("routeBOverview").notNull(),
  testVariable: text("testVariable").notNull(),
  targetMetricsJson: text("targetMetricsJson").notNull(),
  expectedLearning: text("expectedLearning").notNull(),
  performanceAdviceJson: text("performanceAdviceJson"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
});

