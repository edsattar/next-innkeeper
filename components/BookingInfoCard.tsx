import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reservation } from "@/db/schema";
import {
  DollarSign,
  HelpCircle,
  SearchCode,
  DoorClosed,
  PlaneLanding,
  PlaneTakeoff,
  Hash,
  CalendarPlus,
  CalendarMinus,
} from "lucide-react";

interface Props {
  booking_data: Omit<Reservation, "created_at" | "updated_at">;
}

const BookingInfoCard = ({ booking_data: data }: Props) => {
  const fields = [
    // { id: 1, label: "RID", value: data.id, icon: <Hash /> },
    {
      id: 4,
      label: "Checkin",
      value: format(data.check_in, "dd MMM"),
      icon: <CalendarPlus size={20} />,
    },
    {
      id: 5,
      label: "Checkout",
      value: format(data.check_out, "dd MMM"),
      icon: <CalendarMinus size={20} />,
    },
    { id: 2, label: "Room", value: data.room_id, icon: <DoorClosed size={20} /> },
    { id: 3, label: "Rate", value: data.room_rate, icon: <DollarSign size={20} /> },
    { id: 7, label: "Status", value: data.status, icon: <HelpCircle size={20} /> },
    { id: 6, label: "Source", value: data.source, icon: <SearchCode size={20} /> },
  ];

  return (
    <Card className="dark:bg-black/40 w-full">
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          <CardTitle className="text-lg flex gap-2"><Hash />{data.id}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 text-fore dark:text-fore-dark min-w-max">
        {fields.map((field) => (
          <div key={field.id} className="flex sm:flex-col items-center sm:items-start gap-2">
            <div className="sm:hidden">{field.icon}</div>
            <p className="hidden font-semibold text-sm sm:flex gap-1 w-max "><span className="w-5">{field.icon}</span> {field.label}:</p>
            <p className="bg-muted/50 dark:bg-muted-dark rounded py-1 px-2 text-base">{field.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default BookingInfoCard;
