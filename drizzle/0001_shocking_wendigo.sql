CREATE TABLE IF NOT EXISTS "ab_test_plan" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"hypothesis" text NOT NULL,
	"routeAOverview" text NOT NULL,
	"routeBOverview" text NOT NULL,
	"testVariable" text NOT NULL,
	"targetMetricsJson" text NOT NULL,
	"expectedLearning" text NOT NULL,
	"performanceAdviceJson" text,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_asset" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"routeId" text,
	"assetType" text NOT NULL,
	"imageUrl" text NOT NULL,
	"aspectRatio" text DEFAULT '1:1',
	"promptUsed" text,
	"modelUsed" text DEFAULT 'Seedream 5.0 Pro',
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_product" (
	"campaignId" text NOT NULL,
	"productId" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "campaign_product_campaignId_productId_pk" PRIMARY KEY("campaignId","productId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign" (
	"id" text PRIMARY KEY NOT NULL,
	"projectId" text NOT NULL,
	"userId" text NOT NULL,
	"productName" text NOT NULL,
	"category" text NOT NULL,
	"pricePromo" text,
	"targetMarket" text DEFAULT 'VN',
	"requiredClaims" text,
	"restrictedClaims" text,
	"brandKitJson" text,
	"marketSignalJson" text,
	"positioningJson" text,
	"status" text DEFAULT 'draft',
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "creative_route" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"routeType" text NOT NULL,
	"routeName" text NOT NULL,
	"hookIdea" text NOT NULL,
	"visualDirection" text NOT NULL,
	"messageAngle" text NOT NULL,
	"suggestedPlatform" text NOT NULL,
	"adCopyJson" text,
	"videoAssetUrl" text,
	"videoStoryboardJson" text,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_asset" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"parentAssetId" text,
	"name" text NOT NULL,
	"objectKey" text NOT NULL,
	"url" text NOT NULL,
	"mediaType" text NOT NULL,
	"mimeType" text NOT NULL,
	"sizeBytes" integer NOT NULL,
	"width" integer,
	"height" integer,
	"durationSeconds" integer,
	"altText" text,
	"caption" text,
	"source" text DEFAULT 'Upload',
	"tagsJson" text DEFAULT '[]',
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_media" (
	"productId" text NOT NULL,
	"mediaAssetId" text NOT NULL,
	"role" text DEFAULT 'gallery',
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "product_media_productId_mediaAssetId_pk" PRIMARY KEY("productId","mediaAssetId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"sku" text NOT NULL,
	"category" text DEFAULT 'Uncategorized',
	"brand" text,
	"imageUrl" text,
	"priceCents" integer DEFAULT 0,
	"currency" text DEFAULT 'USD',
	"promotion" text,
	"description" text,
	"sellingPointsJson" text DEFAULT '[]',
	"requiredClaimsJson" text DEFAULT '[]',
	"restrictedClaimsJson" text DEFAULT '[]',
	"audience" text,
	"targetMarket" text,
	"status" text DEFAULT 'draft',
	"readiness" integer DEFAULT 0,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ab_test_plan" ADD CONSTRAINT "ab_test_plan_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_asset" ADD CONSTRAINT "campaign_asset_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_asset" ADD CONSTRAINT "campaign_asset_routeId_creative_route_id_fk" FOREIGN KEY ("routeId") REFERENCES "public"."creative_route"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_product" ADD CONSTRAINT "campaign_product_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_product" ADD CONSTRAINT "campaign_product_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign" ADD CONSTRAINT "campaign_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign" ADD CONSTRAINT "campaign_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "creative_route" ADD CONSTRAINT "creative_route_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_asset" ADD CONSTRAINT "media_asset_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_media" ADD CONSTRAINT "product_media_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_media" ADD CONSTRAINT "product_media_mediaAssetId_media_asset_id_fk" FOREIGN KEY ("mediaAssetId") REFERENCES "public"."media_asset"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
