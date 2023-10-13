import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getReservationByID, get_countries_list, get_last_RID, get_rooms_list, get_customers_info, getCustomerByID } from "@/actions";
import { reservation_sources, reservation_status } from "@/db/schema";
import { ReservationForm } from "@/app/staff/reservations/components/ReservationForm";
import { redirect } from "next/navigation";

interface Props {
  params: { rid: string };
}

const Page = async ({ params }: Props) => {
  // if rid is not a number, redirect to the reservations list
  if (isNaN(params.rid as any)) {
    redirect("/staff/reservations");
  }
  const rid = parseInt(params.rid);

  // if rid is a number (not NaN), we can try to fetch the data
  const reservation_data = await getReservationByID(rid);
  if (!reservation_data || reservation_data.length == 0) {
    // if data is empty, redirect to the reservations list
    redirect("/staff/reservations");
  }
  const customer_data = await getCustomerByID(reservation_data[0].customer_id);

  const last_rid = await get_last_RID(); // for the next rid
  const room_list = await get_rooms_list(); // for the room dropdown
  const countries_list = await get_countries_list(); // for the country dropdown
  const customers_info = await get_customers_info(); // for the customer search dropdown
  const status_labels = reservation_status.enumValues.map((value) => ({ status: value }));
  const sources_labels = reservation_sources.enumValues.map((value) => ({ source: value }));

  const form_props = {
    initial_data: reservation_data[0],
    customer_data: customer_data[0],
    next_rid: parseInt(last_rid[0].last_value) + 1,
    room_list,
    countries_list,
    customers_info,
    status_labels,
    sources_labels,
  };
  // const form_props = await Promise.all([
  //   get_last_RID(),
  //   get_rooms_list(),
  //   get_countries_list(),
  //   get_customers_info(),
  // ]).then(([last_rid, room_list, countries_list, customers_info]) => ({
  //   next_rid: parseInt(last_rid[0].last_value) + 1,
  //   room_list,
  //   countries_list,
  //   customers_info,
  //   status_labels: reservation_status.enumValues.map((value) => ({ status: value })),
  //   sources_labels: reservation_sources.enumValues.map((value) => ({ source: value })),
  // }));

  return (
    <>
      <div className="m-auto flex h-full w-full max-w-7xl flex-col space-y-8 p-8">
        <div className="flex h-10 items-center justify-between space-x-2">
          <h2 className="w-32 text-2xl font-bold tracking-tight sm:w-auto">Edit Reservation</h2>
          <Link href={`/staff/reservations/${rid}`}>
            <Button variant="secondary" className="w-[100px] self-center">
              Cancel
            </Button>
          </Link>
        </div>
        <Separator />
        <ReservationForm {...form_props} />
      </div>
    </>
  );
};

export default Page;
