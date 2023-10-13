import { Separator } from "@ui/separator";

import {
  get_countries_list,
  get_customers_info,
  get_last_RID,
  get_rooms_list,
} from "@/actions";
import { reservation_sources, reservation_status } from "@/db/schema";
import { ReservationForm } from "@/app/staff/reservations/components/ReservationForm";

const Page = async () => {

  const countries_list = await get_countries_list(); // for the country dropdown
  const last_rid = await get_last_RID(); // for the next rid
  const room_list = await get_rooms_list(); // for the room dropdown
  const customers_info = await get_customers_info(); // for the customer search dropdown
  const status_labels = reservation_status.enumValues.map((value) => ({
    status: value,
  }));
  const sources_labels = reservation_sources.enumValues.map((value) => ({
    source: value,
  }));

  const form_props = {
    countries_list: countries_list,
    next_rid: parseInt(last_rid[0].last_value) + 1,
    room_list: room_list,
    customers_info: customers_info,
    status_labels: status_labels,
    sources_labels: sources_labels,
  };

  return (
    <>
      <div className="flex h-full w-full m-auto max-w-7xl flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-x-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight w-32 sm:w-auto">Create Reservation</h2>
          </div>
        </div>
        <Separator />
        <ReservationForm {...form_props} />
      </div>
    </>
  );
}
export default Page