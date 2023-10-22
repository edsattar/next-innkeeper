import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteReservation, getCustomerByID, getReservationByID } from "@/actions";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import GuestInfoCard from "@/components/GuestInfoCard";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import BookingInfoCard from "@/components/BookingInfoCard";

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

  return (
    <>
      <div className="m-auto flex h-full w-full max-w-7xl flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-x-2">
          <h2 className="w-32 text-2xl font-bold tracking-tight sm:w-auto">Reservation Details</h2>
          <div className="flex gap-4">
            <Link href={`/staff/reservations/${rid}/edit`}>
              <Button className="w-[100px] self-center">Edit</Button>
            </Link>
            <DeleteConfirmDialog id={reservation_data[0].id} deleteAction={deleteReservation} />
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <BookingInfoCard booking_data={reservation_data[0]} />
          <GuestInfoCard customer_data={customer_data[0]} />
        </div>
      </div>
    </>
  );
};

export default Page;
