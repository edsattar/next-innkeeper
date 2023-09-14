"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import FlagIcon from "@/components/FlagIcon";

import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const EditButton = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      onClick={() => router.push(`/staff/reservations/${id}`)}
      className="group hover:bg-transparent bg-transparent w-12 h-8 p-0 -ml-3 -mr-2 text-fore dark:text-fore-dark"
    >
      <EditIcon className="hidden group-hover:flex" size={20} />
      <p className="group-hover:hidden underline">{id}</p>
    </Button>
  );
}

type ReservationRow = {
  id: number;
  room_id: number;
  guest_name: string | null;
  country_iso: string | null;
  room_rate: number;
  check_in: Date;
  check_out: Date;
  status: "booked" | "checked_in" | "checked_out" | "cancelled";
  source: "booking.com"| "expedia.com"| "corporate"| "walk_in"| "phone"| "email"| "other";
}

export const reservations_list_columns: ColumnDef<ReservationRow>[] =
  [
    {
      accessorKey: "id",
      header: "RID",
      cell: ({ row }) => <EditButton id={row.getValue("id")} />,
    },
    {
      accessorKey: "room_id",
      header: "Room",
      cell: ({ row }) => (
        <div className="w-[40px] text-base font-bold">
          {row.getValue("room_id")}
        </div>
      ),
    },
    {
      accessorKey: "guest_name",
      header: "Guest",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <FlagIcon code={row.original.country_iso || ""} />
            {row.original.guest_name}
          </div>
        );
      },
    },
    {
      accessorKey: "room_rate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rate" />
      ),
      enableResizing: true,
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "check_in",
      header: () => <div className="min-w-[50px]">CheckIn</div>,
      cell: (e) => format(e.row.original.check_in, "dd MMM"),
    },
    {
      accessorKey: "check_out",
      header: "CheckOut",
      cell: (e) => format(e.row.original.check_out, "dd MMM"),
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        const val = row.getValue("source");

        return (
          <div
            className={cn(
              "-m-1 rounded p-1 text-center text-xs",
              val === "expedia.com"
                ? "bg-yellow-600/70"
                : val === "booking.com"
                  ? "bg-blue-600/70"
                  : "bg-muted dark:bg-muted-dark",
            )}
          >
            {row.getValue("source")}
          </div>
        );
      },
    },
    { accessorKey: "status", header: "Status" },
  ];
