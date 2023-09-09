ALTER TABLE "countries" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "countries" ALTER COLUMN "iso" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "room_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "room_rate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "check_in" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "check_in" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "check_out" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "source" SET DEFAULT 'other';--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "source" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_name_unique" UNIQUE("name");