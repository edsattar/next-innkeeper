CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"iso" varchar(2),
	"iso3" varchar(3)
);
