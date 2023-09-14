"use server";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import * as s from "@/db/schema";

export const addReservation = async (data: s.NewReservation) => {
  await db.insert(s.reservations).values({
    customer_id: data.customer_id,
    room_id: data.room_id,
    room_rate: data.room_rate,
    check_in: new Date(data.check_in),
    check_out: new Date(data.check_out),
    status: data.status,
    source: data.source,
  });
  return { success: true };
};

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
