import Link from "next/link";

import { reservations_list,  get_last_rid, get_rooms_list } from "@/db";
import { eq } from "drizzle-orm";
import { reservations } from "@/db/schema";
import { Separator } from "@/components/ui/separator";
import { ReservationForm } from "./ReservationForm";
import { Button } from "@/components/ui/button";
import { getReservationByID, get_countries_list } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  params: { rid: string };
}

const Page = async ({ params }: Props) => {
  const rid = parseInt(params.rid);
  const data = rid ? await getReservationByID(rid) : null;
  const countries_list = await get_countries_list();
  const last_rid = await get_last_rid;
  const room_list = await get_rooms_list;

  const formProps = {
    initialData: data && data.length > 0 ? data[0] : null,
    countries_list: countries_list,
    last_rid: last_rid[0].id,
    room_list: room_list,
  };

  if (rid && !formProps.initialData) {
    redirect("/staff/reservations");
  }

  return (
    <>
      <div className="flex h-full w-full m-auto max-w-7xl flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-x-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight w-32 sm:w-auto">{formProps.initialData ? "Edit Reservation" : "Create Reservation"}</h2>
          </div>
          <div className="flex items-center space-x-2">
            {params.rid === "old" && (
              <Link href="/staff/reservations/new">
                <Button>New Guest</Button>
              </Link>
            )}

            {params.rid === "new" && (
              <Link href="/staff/reservations/old">
                <Button>Returning Guest</Button>
              </Link>
            )}
          </div>
        </div>
        <Separator />
        <ReservationForm {...formProps} />
      </div>
    </>
  );
};

export default Page;
