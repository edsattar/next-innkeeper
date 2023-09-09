"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import FlagIcon from "@/components/FlagIcon";

import { ReservationsListItemType } from "@/db";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const EditButton = ({id}: {id: number}) => {
  const router = useRouter();
  return (
    <Button
    onClick={() => router.push(`/staff/reservations/${id}`)}
    className="group w-12 p-1 "
  >
    <EditIcon className="hidden group-hover:flex" size={20} />
    <p className="w-5 group-hover:hidden">{id}</p>
  </Button>
  );
}

export const reservations_list_columns: ColumnDef<ReservationsListItemType>[] =
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
            {row.original.guest_name}
            <FlagIcon code={row.original.country || ""} />
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
