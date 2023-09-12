import { reservations_list, get_countries_list, get_last_rid, get_rooms_list } from "@/db";
import { eq } from "drizzle-orm";
import { reservations } from "@/db/schema";
import { Separator } from "@/components/ui/separator";
import { ReservationForm } from "./ReservationForm";

interface Props {
  params: { rid: number | string };
}

const Page = async ({ params }: Props) => {
  const data = typeof params.rid === "number" ? await reservations_list.where(eq(reservations.id, params.rid)) : null;
  const countries_list = await get_countries_list;
  const last_rid = await get_last_rid;
  const room_list = await get_rooms_list;

  const formProps = {
    initialData: data ? data[0] : null,
    countries: countries_list,
    last_rid: last_rid[0].id,
    room_list: room_list,
  };

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{data && data.length > 0 ? "Edit Reservation" : "Create Reservation"}</h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* <UserNav /> */}
            {/* <Button>New</Button> */}
          </div>
        </div>
        <Separator />
        <ReservationForm {...formProps} />
      </div>
    </div>
  );
};

export default Page;
