DROP INDEX IF EXISTS "brand_tenant_slug_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "campaign_tenant_code_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "category_tenant_slug_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "media_folder_tenant_path_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "product_tenant_slug_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "product_tenant_sku_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "tag_tenant_slug_unique";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "brand_tenant_slug_unique" ON "brand" USING btree ("userId","slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "campaign_tenant_code_unique" ON "campaign" USING btree ("userId","code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "category_tenant_slug_unique" ON "category" USING btree ("userId","slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "media_folder_tenant_path_unique" ON "media_folder" USING btree ("userId","path");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_tenant_slug_unique" ON "product" USING btree ("userId","slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_tenant_sku_unique" ON "product" USING btree ("userId","sku");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tag_tenant_slug_unique" ON "tag" USING btree ("userId","slug");