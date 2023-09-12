import { serial, text, timestamp, pgTable, varchar, pgEnum, integer, smallint, decimal } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  iso: varchar("iso", { length: 2 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  iso3: varchar("iso3", { length: 3 }),
});

export const roleEnum = pgEnum("role", ["admin", "manager", "front", "customer"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull().unique(),
  role: roleEnum("role").notNull().default("customer"),
  password: varchar("password", { length: 100 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export const room_types = pgTable("room_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }),
});

export const rooms = pgTable("rooms", {
  id: smallint("id").primaryKey(),
  room_type_id: smallint("room_type_id").references(() => room_types.id),
});

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),
  country_iso: varchar("country_iso").references(() => countries.iso).notNull(),
  id_card_type: varchar("id_type", { length: 20 }),
  id_card_number: varchar("id_number", { length: 20 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const reservation_sources = pgEnum("reservation_sources", ["booking.com", "expedia.com", "corporate", "walk_in", "phone", "email", "other"]);

export const reservation_status = pgEnum("reservation_status", ["booked", "checked_in", "checked_out", "cancelled"]);
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  room_id: integer("room_id")
    .notNull()
    .references(() => rooms.id),
  customer_id: integer("customer_id").references(() => customers.id),
  room_rate: integer("room_rate").notNull(),
  check_in: timestamp("check_in").defaultNow().notNull(),
  check_out: timestamp("check_out").notNull(),
  source: reservation_sources("source").notNull().default("other"),
  status: reservation_status("status").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type Reservation = typeof reservations.$inferSelect;

export const bill_types = pgEnum("bill_types", ["room", "restaurant", "laundry", "other"]);

export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),
  reservation_id: integer("reservation_id").references(() => reservations.id),
  bill_type: bill_types("bill_type"),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const bill_items = pgTable("bill_items", {
  id: serial("id").primaryKey(),
  bill_id: integer("bill_id").references(() => bills.id),
  name: varchar("name", { length: 100 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  quantity: integer("quantity"),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const payment_methods = pgEnum("payment_methods", ["bkash", "rocket", "nagad", "cash", "credit_card", "debit_card", "online_transfer", "expedia", "other"]);

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  bill_id: integer("bill_id").references(() => bills.id),
  payment_method: payment_methods("payment_method"),
  amount: integer("amount"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
