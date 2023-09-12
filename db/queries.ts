import { db } from '@/db'
import { eq, sql } from "drizzle-orm";
import { reservations, customers, countries, users, rooms } from "@/db/schema";

export const reservations_list = db
  .select({
    id: reservations.id,
    room_id: reservations.room_id,
    guest_name: customers.name,
    country: countries.iso,
    room_rate: reservations.room_rate,
    check_in: reservations.check_in,
    check_out: reservations.check_out,
    status: reservations.status,
    source: reservations.source,
  })
  .from(reservations)
  .leftJoin(customers, eq(reservations.customer_id, customers.id))
  .leftJoin(countries, eq(customers.nationality, countries.name));
export type ReservationsListType = typeof reservations_list._.result;
export type ReservationsListItemType = (typeof reservations_list._.result)[0];

export const countries_list = db
  .select({
    iso: countries.iso,
    name: countries.name,
  })
  .from(countries);
export type CountriesListType = typeof countries_list._.result;

export const get_last_rid = db
  .select({ id: sql<number>`max(${reservations.id})` })
  .from(reservations);

export const get_rooms_list = db.select({id: rooms.id}).from(rooms);
export type RoomsListType = typeof get_rooms_list._.result;

