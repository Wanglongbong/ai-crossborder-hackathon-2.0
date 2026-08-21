CREATE TABLE IF NOT EXISTS "ab_test_plan" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"name" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"hypothesis" text NOT NULL,
	"routeAId" text,
	"routeBId" text,
	"testVariable" text NOT NULL,
	"targetMetricsJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"expectedLearning" text,
	"performanceAdviceJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"startAt" timestamp,
	"endAt" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brand" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"legalName" text,
	"description" text,
	"websiteUrl" text,
	"toneOfVoice" text,
	"primaryColor" text,
	"secondaryColor" text,
	"brandGuidelinesUrl" text,
	"logoMediaId" text,
	"coverMediaId" text,
	"status" text DEFAULT 'active' NOT NULL,
	"settingsJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"archivedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_asset" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"routeId" text,
	"mediaAssetId" text,
	"assetType" text NOT NULL,
	"title" text NOT NULL,
	"externalUrl" text,
	"aspectRatio" text,
	"width" integer,
	"height" integer,
	"promptUsed" text,
	"modelUsed" text,
	"status" text DEFAULT 'planned' NOT NULL,
	"placement" text,
	"metadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_brief_version" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"version" integer NOT NULL,
	"briefJson" jsonb NOT NULL,
	"changeNote" text,
	"createdByUserId" text,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_content_item" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"routeId" text,
	"contentType" text NOT NULL,
	"channel" text,
	"locale" text DEFAULT 'vi-VN' NOT NULL,
	"title" text,
	"body" text,
	"cta" text,
	"hashtagsJson" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"structuredContentJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"generatedBy" text,
	"generationMetadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"approvedByUserId" text,
	"approvedAt" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_job" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"jobType" text NOT NULL,
	"provider" text,
	"model" text,
	"status" text DEFAULT 'queued' NOT NULL,
	"externalJobId" text,
	"inputJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"outputJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"errorCode" text,
	"errorMessage" text,
	"startedAt" timestamp,
	"completedAt" timestamp,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign_signal" (
	"campaignId" text NOT NULL,
	"signalId" text NOT NULL,
	"relevanceNote" text,
	"snapshotJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"addedAt" timestamp NOT NULL,
	CONSTRAINT "campaign_signal_campaignId_signalId_pk" PRIMARY KEY("campaignId","signalId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campaign" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"projectId" text,
	"productId" text NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"objective" text,
	"targetMarket" text DEFAULT 'VN' NOT NULL,
	"targetAudience" text,
	"language" text DEFAULT 'vi' NOT NULL,
	"startAt" timestamp,
	"endAt" timestamp,
	"budgetAmount" numeric(14, 2),
	"budgetCurrency" text DEFAULT 'VND' NOT NULL,
	"briefSnapshotJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"productSnapshotJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"brandSnapshotJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"positioningJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"approvedByUserId" text,
	"approvedAt" timestamp,
	"archivedAt" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"parentId" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"imageMediaId" text,
	"icon" text,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"metadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"archivedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "creative_route" (
	"id" text PRIMARY KEY NOT NULL,
	"campaignId" text NOT NULL,
	"routeType" text NOT NULL,
	"routeName" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"hookIdea" text NOT NULL,
	"visualDirection" text NOT NULL,
	"messageAngle" text NOT NULL,
	"suggestedPlatformsJson" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"targetMetric" text,
	"adCopyJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"videoStoryboardJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"generationMetadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "market_signal" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"categoryId" text,
	"title" text NOT NULL,
	"signalType" text NOT NULL,
	"market" text NOT NULL,
	"language" text DEFAULT 'vi' NOT NULL,
	"summary" text NOT NULL,
	"trendKeywordsJson" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"painPointsJson" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"recommendedAction" text,
	"sourceName" text NOT NULL,
	"sourceUrl" text,
	"sourceMediaId" text,
	"sourceDataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"confidence" text DEFAULT 'medium' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"capturedAt" timestamp NOT NULL,
	"expiresAt" timestamp,
	"verifiedByUserId" text,
	"verifiedAt" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_asset_folder" (
	"mediaAssetId" text NOT NULL,
	"folderId" text NOT NULL,
	"addedAt" timestamp NOT NULL,
	CONSTRAINT "media_asset_folder_mediaAssetId_folderId_pk" PRIMARY KEY("mediaAssetId","folderId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_asset" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"createdByUserId" text,
	"originalFileName" text NOT NULL,
	"displayName" text NOT NULL,
	"altText" text,
	"caption" text,
	"mediaType" text NOT NULL,
	"mimeType" text NOT NULL,
	"extension" text,
	"byteSize" integer NOT NULL,
	"width" integer,
	"height" integer,
	"durationMs" integer,
	"checksumSha256" text,
	"storageProvider" text NOT NULL,
	"storageBucket" text,
	"storageKey" text,
	"sourceUrl" text,
	"publicUrl" text,
	"thumbnailUrl" text,
	"status" text DEFAULT 'ready' NOT NULL,
	"visibility" text DEFAULT 'private' NOT NULL,
	"aiGenerated" boolean DEFAULT false NOT NULL,
	"aiProvider" text,
	"aiModel" text,
	"generationPrompt" text,
	"generationMetadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"metadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"deletedAt" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_derivative" (
	"id" text PRIMARY KEY NOT NULL,
	"mediaAssetId" text NOT NULL,
	"derivativeType" text NOT NULL,
	"url" text NOT NULL,
	"mimeType" text,
	"width" integer,
	"height" integer,
	"byteSize" integer,
	"metadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_folder" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"parentId" text,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_claim" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text NOT NULL,
	"claimType" text NOT NULL,
	"claimText" text NOT NULL,
	"market" text,
	"language" text DEFAULT 'vi' NOT NULL,
	"evidenceMediaId" text,
	"evidenceUrl" text,
	"status" text DEFAULT 'active' NOT NULL,
	"validFrom" timestamp,
	"validUntil" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_media" (
	"productId" text NOT NULL,
	"mediaAssetId" text NOT NULL,
	"variantId" text,
	"role" text DEFAULT 'gallery' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"isPrimary" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "product_media_productId_mediaAssetId_pk" PRIMARY KEY("productId","mediaAssetId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_tag" (
	"productId" text NOT NULL,
	"tagId" text NOT NULL,
	CONSTRAINT "product_tag_productId_tagId_pk" PRIMARY KEY("productId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_variant" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text NOT NULL,
	"sku" text NOT NULL,
	"barcode" text,
	"name" text NOT NULL,
	"price" numeric(14, 2) NOT NULL,
	"compareAtPrice" numeric(14, 2),
	"costPrice" numeric(14, 2),
	"currency" text DEFAULT 'VND' NOT NULL,
	"inventoryQuantity" integer DEFAULT 0 NOT NULL,
	"inventoryPolicy" text DEFAULT 'deny' NOT NULL,
	"weightGrams" integer,
	"status" text DEFAULT 'active' NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"brandId" text,
	"categoryId" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"sku" text NOT NULL,
	"barcode" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"shortDescription" text,
	"description" text,
	"usp" text,
	"targetAudience" text,
	"targetMarketsJson" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"countryOfOrigin" text,
	"taxCode" text,
	"weightGrams" integer,
	"lengthMm" integer,
	"widthMm" integer,
	"heightMm" integer,
	"seoTitle" text,
	"seoDescription" text,
	"metadataJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"publishedAt" timestamp,
	"archivedAt" timestamp,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"color" text,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspace_member" (
	"workspaceId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"invitedByUserId" text,
	"joinedAt" timestamp NOT NULL,
	CONSTRAINT "workspace_member_workspaceId_userId_pk" PRIMARY KEY("workspaceId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"ownerId" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logoMediaId" text,
	"settingsJson" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"archivedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ab_test_plan" ADD CONSTRAINT "ab_test_plan_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ab_test_plan" ADD CONSTRAINT "ab_test_plan_routeAId_creative_route_id_fk" FOREIGN KEY ("routeAId") REFERENCES "public"."creative_route"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ab_test_plan" ADD CONSTRAINT "ab_test_plan_routeBId_creative_route_id_fk" FOREIGN KEY ("routeBId") REFERENCES "public"."creative_route"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "brand" ADD CONSTRAINT "brand_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "brand" ADD CONSTRAINT "brand_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "brand" ADD CONSTRAINT "brand_logoMediaId_media_asset_id_fk" FOREIGN KEY ("logoMediaId") REFERENCES "public"."media_asset"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "brand" ADD CONSTRAINT "brand_coverMediaId_media_asset_id_fk" FOREIGN KEY ("coverMediaId") REFERENCES "public"."media_asset"("id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "campaign_asset" ADD CONSTRAINT "campaign_asset_mediaAssetId_media_asset_id_fk" FOREIGN KEY ("mediaAssetId") REFERENCES "public"."media_asset"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_brief_version" ADD CONSTRAINT "campaign_brief_version_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_brief_version" ADD CONSTRAINT "campaign_brief_version_createdByUserId_user_id_fk" FOREIGN KEY ("createdByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_content_item" ADD CONSTRAINT "campaign_content_item_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_content_item" ADD CONSTRAINT "campaign_content_item_routeId_creative_route_id_fk" FOREIGN KEY ("routeId") REFERENCES "public"."creative_route"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_content_item" ADD CONSTRAINT "campaign_content_item_approvedByUserId_user_id_fk" FOREIGN KEY ("approvedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_job" ADD CONSTRAINT "campaign_job_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_signal" ADD CONSTRAINT "campaign_signal_campaignId_campaign_id_fk" FOREIGN KEY ("campaignId") REFERENCES "public"."campaign"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign_signal" ADD CONSTRAINT "campaign_signal_signalId_market_signal_id_fk" FOREIGN KEY ("signalId") REFERENCES "public"."market_signal"("id") ON DELETE restrict ON UPDATE no action;
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
 ALTER TABLE "campaign" ADD CONSTRAINT "campaign_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign" ADD CONSTRAINT "campaign_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign" ADD CONSTRAINT "campaign_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "campaign" ADD CONSTRAINT "campaign_approvedByUserId_user_id_fk" FOREIGN KEY ("approvedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_imageMediaId_media_asset_id_fk" FOREIGN KEY ("imageMediaId") REFERENCES "public"."media_asset"("id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "market_signal" ADD CONSTRAINT "market_signal_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "market_signal" ADD CONSTRAINT "market_signal_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "market_signal" ADD CONSTRAINT "market_signal_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "market_signal" ADD CONSTRAINT "market_signal_sourceMediaId_media_asset_id_fk" FOREIGN KEY ("sourceMediaId") REFERENCES "public"."media_asset"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "market_signal" ADD CONSTRAINT "market_signal_verifiedByUserId_user_id_fk" FOREIGN KEY ("verifiedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_asset_folder" ADD CONSTRAINT "media_asset_folder_mediaAssetId_media_asset_id_fk" FOREIGN KEY ("mediaAssetId") REFERENCES "public"."media_asset"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_asset_folder" ADD CONSTRAINT "media_asset_folder_folderId_media_folder_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."media_folder"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "media_asset" ADD CONSTRAINT "media_asset_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_asset" ADD CONSTRAINT "media_asset_createdByUserId_user_id_fk" FOREIGN KEY ("createdByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_derivative" ADD CONSTRAINT "media_derivative_mediaAssetId_media_asset_id_fk" FOREIGN KEY ("mediaAssetId") REFERENCES "public"."media_asset"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_folder" ADD CONSTRAINT "media_folder_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_folder" ADD CONSTRAINT "media_folder_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_claim" ADD CONSTRAINT "product_claim_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_claim" ADD CONSTRAINT "product_claim_evidenceMediaId_media_asset_id_fk" FOREIGN KEY ("evidenceMediaId") REFERENCES "public"."media_asset"("id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "product_media" ADD CONSTRAINT "product_media_mediaAssetId_media_asset_id_fk" FOREIGN KEY ("mediaAssetId") REFERENCES "public"."media_asset"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_media" ADD CONSTRAINT "product_media_variantId_product_variant_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."product_variant"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_tag" ADD CONSTRAINT "product_tag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_brandId_brand_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_invitedByUserId_user_id_fk" FOREIGN KEY ("invitedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace" ADD CONSTRAINT "workspace_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ab_test_plan_campaign_idx" ON "ab_test_plan" USING btree ("campaignId","status");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "brand_tenant_slug_unique" ON "brand" USING btree ("userId","workspaceId","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "brand_tenant_idx" ON "brand" USING btree ("userId","workspaceId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_asset_campaign_idx" ON "campaign_asset" USING btree ("campaignId","assetType","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_asset_route_idx" ON "campaign_asset" USING btree ("routeId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "campaign_brief_version_unique" ON "campaign_brief_version" USING btree ("campaignId","version");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_content_campaign_idx" ON "campaign_content_item" USING btree ("campaignId","contentType","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_content_route_idx" ON "campaign_content_item" USING btree ("routeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_job_campaign_status_idx" ON "campaign_job" USING btree ("campaignId","status");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "campaign_job_external_id_unique" ON "campaign_job" USING btree ("provider","externalJobId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_tenant_idx" ON "campaign" USING btree ("userId","workspaceId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "campaign_product_idx" ON "campaign" USING btree ("productId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "campaign_tenant_code_unique" ON "campaign" USING btree ("userId","workspaceId","code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "category_tenant_slug_unique" ON "category" USING btree ("userId","workspaceId","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_tenant_idx" ON "category" USING btree ("userId","workspaceId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_parent_idx" ON "category" USING btree ("parentId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "creative_route_campaign_type_unique" ON "creative_route" USING btree ("campaignId","routeType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "creative_route_campaign_idx" ON "creative_route" USING btree ("campaignId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "market_signal_tenant_idx" ON "market_signal" USING btree ("userId","workspaceId","market","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "market_signal_category_idx" ON "market_signal" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "market_signal_expiry_idx" ON "market_signal" USING btree ("expiresAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_asset_tenant_idx" ON "media_asset" USING btree ("userId","workspaceId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_asset_checksum_idx" ON "media_asset" USING btree ("userId","checksumSha256");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_asset_type_idx" ON "media_asset" USING btree ("userId","mediaType");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "media_derivative_asset_type_unique" ON "media_derivative" USING btree ("mediaAssetId","derivativeType");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "media_folder_tenant_path_unique" ON "media_folder" USING btree ("userId","workspaceId","path");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_folder_tenant_idx" ON "media_folder" USING btree ("userId","workspaceId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_folder_parent_idx" ON "media_folder" USING btree ("parentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_claim_product_idx" ON "product_claim" USING btree ("productId","claimType","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_media_product_idx" ON "product_media" USING btree ("productId","position");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_variant_product_sku_unique" ON "product_variant" USING btree ("productId","sku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_variant_product_idx" ON "product_variant" USING btree ("productId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_tenant_slug_unique" ON "product" USING btree ("userId","workspaceId","slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_tenant_sku_unique" ON "product" USING btree ("userId","workspaceId","sku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_tenant_status_idx" ON "product" USING btree ("userId","workspaceId","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_brand_idx" ON "product" USING btree ("brandId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_idx" ON "product" USING btree ("categoryId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tag_tenant_slug_unique" ON "tag" USING btree ("userId","workspaceId","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspace_member_user_idx" ON "workspace_member" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workspace_owner_slug_unique" ON "workspace" USING btree ("ownerId","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "workspace_owner_idx" ON "workspace" USING btree ("ownerId");