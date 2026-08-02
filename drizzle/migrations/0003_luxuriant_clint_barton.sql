CREATE TYPE "public"."card_mark" AS ENUM('entry', 'shiny');--> statement-breakpoint
CREATE TABLE "card_editions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(200) NOT NULL,
	"card_count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "card_marks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition_id" uuid NOT NULL,
	"card_number" integer NOT NULL,
	"mark" "card_mark" NOT NULL,
	"marked_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "card_marks_edition_card_unique" UNIQUE("edition_id","card_number")
);
--> statement-breakpoint
ALTER TABLE "card_marks" ADD CONSTRAINT "card_marks_edition_id_card_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "public"."card_editions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "card_marks_edition_idx" ON "card_marks" USING btree ("edition_id");