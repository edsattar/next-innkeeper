"use server";
import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import * as s from "@/db/schema";
import { ReservationFormValues } from "@/app/staff/reservations/[rid]/ReservationForm";

export const addReservation = async (data: s.NewReservation) => {
  await db.insert(s.reservations).values({
    ...data,
    // TODO
    // customer_id: data.customer_id,
    // room_id: data.room_id,
    // room_rate: data.room_rate,
    // check_in: data.check_in,
    // check_out: data.check_out,
    // status: data.status,
    // source: data.source,
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

export const addCustomer = async (data: s.NewCustomer) => {
  const result = await db
    .insert(s.customers)
    .values({
      ...data,
      // name: data.name,
      // phone: data.phone,
      // email: data.email,
      // country_iso: data.country_iso,
      // id_card_type: data.id_card_type,
      // id_card_number: data.id_card_number,
    })
    .returning({ insertedId: s.customers.id });
  return { success: true, insert_return: result };
};

export const getCustomerEmails = () =>
  db
    .select({
      id: s.customers.id,
      label: s.customers.email,
    })
    .from(s.customers);

export const getCustomerPhones = () =>
  db
    .select({
      id: s.customers.id,
      label: s.customers.phone,
    })
    .from(s.customers);

export const getCustomerByID = (customer_id: number) => db.select().from(s.customers).where(eq(s.customers.id, customer_id));

export const getReservationByID = (reservations_id: number) =>
  db
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

export const getReservationsList = () =>
  db
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
