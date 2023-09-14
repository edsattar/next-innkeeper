import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq, sql, asc } from "drizzle-orm";

import postgres from "postgres";
import * as s from "./schema";

const queryClient = postgres(process.env.DB_URL as string);
export const db: PostgresJsDatabase = drizzle(queryClient, );

// ----- QUERIES -----
export const reservations_list = db
  .select({
    id: s.reservations.id,
    room_id: s.reservations.room_id,
    guest_name: s.customers.name,
    country: s.countries.name,
    room_rate: s.reservations.room_rate,
    check_in: s.reservations.check_in,
    check_out: s.reservations.check_out,
    status: s.reservations.status,
    source: s.reservations.source,
  })
  .from(s.reservations)
  .leftJoin(s.customers, eq(s.reservations.customer_id, s.customers.id))
  .leftJoin(s.countries, eq(s.customers.country_iso, s.countries.iso));


export type ReservationType = typeof s.reservations.$inferSelect 
export type CustomerType = typeof s.customers.$inferSelect

export const update_reservation = async (data: ReservationType) => {
  await db
  .update(s.reservations)
  .set({
    room_id: data.room_id,
    room_rate: data.room_rate,
    check_in: data.check_in,
    check_out: data.check_out,
    status: data.status,
    source: data.source,
  })
  .where(eq(s.reservations.id, data.id));
}

export const get_countries_list = db
  .select({
    id: s.countries.iso,
    label: s.countries.name,
  })
  .from(s.countries);
export type CountriesListType = typeof get_countries_list._.result;

export const get_last_rid = db
  .select({ id: sql<number>`max(${s.reservations.id})` })
  .from(s.reservations);

export const get_rooms_list = db.select({label: s.rooms.id}).from(s.rooms);
export type RoomsListType = typeof get_rooms_list._.result;
