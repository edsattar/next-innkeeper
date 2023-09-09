import { Button } from "@/components/ui/button";
import DataTable from "./components/DataTable";
import { reservations_list_columns } from "./components/Columns";

import { db, reservations_list } from "@/db";
import { eq, sql } from "drizzle-orm";
import { reservations, customers, countries } from "@/db/schema";
import Link from "next/link";

const Page = async () => {
  const data = await reservations_list;
  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reservations</h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* <UserNav /> */}
            <Link href="/staff/reservations/0">
              <Button>New</Button>
            </Link>
          </div>
        </div>
        <DataTable columns={reservations_list_columns} data={data} />
      </div>
    </div>
  );
};
export default Page;
