DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_parentId_category_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media_folder" ADD CONSTRAINT "media_folder_parentId_media_folder_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."media_folder"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
