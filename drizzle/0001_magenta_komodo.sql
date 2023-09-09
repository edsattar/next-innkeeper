ALTER TABLE "bill_items" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "bills" ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "room_type_id" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN IF EXISTS "name";