import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";

import postgres from "postgres";
import * as s from "./schema";

const queryClient = postgres(process.env.DB_URL as string);
export const db: PostgresJsDatabase = drizzle(queryClient);

export type ReservationType = typeof s.reservations.$inferSelect;
export type CustomerType = typeof s.customers.$inferSelect;

export const get_rooms_list = db.select({ label: s.rooms.id }).from(s.rooms);
export type RoomsListType = typeof get_rooms_list._.result;
