CREATE TABLE "shiny_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_id" uuid NOT NULL,
	"card_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shiny_entries_edition_card_unique" UNIQUE("edition_id","card_number")
);
--> statement-breakpoint
ALTER TABLE "shiny_entries" ADD CONSTRAINT "shiny_entries_edition_id_card_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."card_editions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "shiny_entries_edition_idx" ON "shiny_entries" USING btree ("edition_id");