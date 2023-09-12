import { db } from "@/db";
import * as s from "@/db/schema";

export const addReservation = async (data: any) => {
  "use server";


  await db.insert(s.reservations).values({
    room_id: data.room_id,
    room_rate: data.room_rate,
    check_in: new Date(data.check_in),
    check_out: new Date(data.check_out),
    status: data.status,
    source: data.source
  });

  return { success: true };
};
