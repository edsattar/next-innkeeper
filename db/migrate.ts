import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
 
const migrationClient = postgres(process.env.DB_URL as string, { max: 1 })
const db = drizzle(migrationClient);

async function main() {
  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "drizzle" });

  console.log("Migrations complete!");

  process.exit(0);
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})