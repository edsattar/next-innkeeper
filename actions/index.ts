"use server";
import { db } from "@/db";
import { eq, asc, sql } from "drizzle-orm";
import * as s from "@/db/schema";

// Reservations

export const addReservation = async (data: s.NewReservation) => {
  console.log("addReservation", data); // TODO: remove
  await db.insert(s.reservations).values({
    customer_id: data.customer_id,
    room_id: data.room_id,
    room_rate: data.room_rate,
    check_in: data.check_in,
    check_out: data.check_out,
    status: data.status,
    source: data.source,
  });
  return { success: true };
};

export const updateReservation = async (data: s.NewReservation) => {
  await db
    .update(s.reservations)
    .set({
      customer_id: data.customer_id,
      room_id: data.room_id,
      room_rate: data.room_rate,
      check_in: data.check_in,
      check_out: data.check_out,
      status: data.status,
      source: data.source,
      updated_at: new Date(),
    })
    .where(eq(s.reservations.id, data.id as number));
};

export const deleteReservation = async (id: number) => {
  console.log("deleteReservation", id); // TODO: remove
  await db.delete(s.reservations).where(eq(s.reservations.id, id));
};

export const getReservationByID = (reservations_id: number) => {
  return db
    .select({
      id: s.reservations.id,
      room_id: s.reservations.room_id,
      room_rate: s.reservations.room_rate,
      check_in: s.reservations.check_in,
      check_out: s.reservations.check_out,
      status: s.reservations.status,
      source: s.reservations.source,
      customer_id: s.reservations.customer_id,
      guest_name: s.customers.name,
      phone: s.customers.phone,
      email: s.customers.email,
      country_iso: s.customers.country_iso,
      id_card_type: s.customers.id_card_type,
      id_card_number: s.customers.id_card_number,
    })
    .from(s.reservations)
    .leftJoin(s.customers, eq(s.reservations.customer_id, s.customers.id))
    .where(eq(s.reservations.id, reservations_id));
};

export const getReservationsList = () => {
  return db
    .select({
      id: s.reservations.id,
      room_id: s.reservations.room_id,
      guest_name: s.customers.name,
      country_iso: s.customers.country_iso,
      room_rate: s.reservations.room_rate,
      check_in: s.reservations.check_in,
      check_out: s.reservations.check_out,
      status: s.reservations.status,
      source: s.reservations.source,
    })
    .from(s.reservations)
    .leftJoin(s.customers, eq(s.reservations.customer_id, s.customers.id))
    .orderBy(asc(s.reservations.id));
};

export const get_reservation_bills = (reservations_id: number) => {
  return db.select({
    bill_id: s.bills.id,
    bill_type: s.bills.bill_type,
    amount: s.bills.amount,
    

  })
  .from(s.bills)
  .where(eq(s.bills.reservation_id, reservations_id))
}

// Customers

export const addCustomer = async (data: s.NewCustomer) => {
  const result = await db
    .insert(s.customers)
    .values({
      name: data.name,
      phone: data.phone,
      email: data.email,
      country_iso: data.country_iso,
      id_card_type: data.id_card_type,
      id_card_number: data.id_card_number,
    })
    .returning({ insertedId: s.customers.id });
  return { success: true, insert_return: result };
};

export const getCustomerByID = (customer_id: number) => {
  return db.select().from(s.customers).where(eq(s.customers.id, customer_id));
};

export const get_customer_emails = () => {
  return db
    .select({
      id: s.customers.id,
      label: s.customers.email,
    })
    .from(s.customers);
};

export const get_customer_phones = () => {
  return db
    .select({
      id: s.customers.id,
      label: s.customers.phone,
    })
    .from(s.customers);
};

export const get_customers_info = () => {
  return db
    .select({
      customer_id: s.customers.id,
      phone: s.customers.phone,
      email: s.customers.email,
    })
    .from(s.customers);
};

// Bills


// Others

const prep_countries_list = db.select({ country_iso: s.countries.iso, name: s.countries.name }).from(s.countries).prepare("countries_list");


export const get_countries_list = () => prep_countries_list.execute()

// export const get_countries_list = () => {
//   return db.select({ country_iso: s.countries.iso, name: s.countries.name }).from(s.countries);
// };

export const get_last_RID = (): Promise<{ last_value: string }[]> => {
  return db.execute(sql`SELECT last_value FROM reservations_id_seq`);
};

export const get_rooms_list = () => {
  return db.select({ room_id: s.rooms.id }).from(s.rooms);
};

export type ReservationType = Awaited<ReturnType<typeof getReservationByID>>;
export type RoomListType = Awaited<ReturnType<typeof get_rooms_list>>;
export type CountriesListType = Awaited<ReturnType<typeof get_countries_list>>;
export type CustomerPhonesType = Awaited<ReturnType<typeof get_customer_phones>>;
export type CustomerEmailsType = Awaited<ReturnType<typeof get_customer_emails>>;
export type CustomersInfoType = Awaited<ReturnType<typeof get_customers_info>>;
