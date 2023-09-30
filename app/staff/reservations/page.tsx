import Link from "next/link";
import { Button } from "@/components/ui/button";
import DataTable from "./components/DataTable";
import { reservations_list_columns } from "./components/Columns";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getReservationsList } from "@/actions";

const Page = async () => {
  const data = await getReservationsList();

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/staff/reservations/old">
              <Button>New Reservation</Button>
            </Link>
          </div>
        </div>
        <DataTable columns={reservations_list_columns} data={data} />
      </div>
    </div>
  );
};
export default Page;
