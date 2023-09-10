import Link from "next/link";
import { Button } from "@/components/ui/button";
import DataTable from "./components/DataTable";
import { reservations_list_columns } from "./components/Columns";

import { get_reservations_list } from "@/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Page = async () => {
  const data = await get_reservations_list();

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* <UserNav /> */}
            {/* <Link href="/staff/reservations/0"> </Link> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>New Reservation</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Link href="/staff/reservations/new">
                    <span>New Customer</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Existing Customer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DataTable columns={reservations_list_columns} data={data} />
      </div>
    </div>
  );
};
export default Page;
