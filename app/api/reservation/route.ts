import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import * as s from "@/db/schema";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(options);

    const body = await req.json();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    // console.log("[RESERVATION_PATCH]", body, params.rid, session.user.role);

    await db.insert(s.reservations).values({
      room_id: body.room_id,
      room_rate: body.room_rate,
      check_in: new Date(body.check_in),
      check_out: new Date(body.check_out),
      status: body.status,
      source: body.source,
    });

    return NextResponse.json({ msg: "ok" });
  } catch (error) {
    console.log("[RESERVATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(options);

    const body = await req.json();

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    // console.log("[RESERVATION_PATCH]", body, params.rid, session.user.role);

    await db
      .update(s.reservations)
      .set({
        room_id: body.room_id,
        room_rate: body.room_rate,
        check_in: new Date(body.check_in),
        check_out: new Date(body.check_out),
        status: body.status,
        source: body.source,
        updated_at: new Date(),
      })
      .where(eq(s.reservations.id, body.id));

    return NextResponse.json({ msg: "ok" });
  } catch (error) {
    console.log("[RESERVATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
