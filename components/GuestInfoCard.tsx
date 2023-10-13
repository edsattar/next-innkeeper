import FlagIcon from "@/components/FlagIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Customer } from "@/db/schema";
import { Phone, Mail, UserSquare, Hash } from "lucide-react";

interface Props {
  customer_data?: Customer;
  loading?: boolean;
}

const GuestInfoCard = ({ customer_data: data, loading }: Props) => {
  const fields = [
    { id: 1, label: "Phone", value: data?.phone, icon: <Phone size={20} /> },
    { id: 2, label: "Email", value: data?.email, icon: <Mail size={20} /> },
    {
      id: 3,
      label: "ID Type",
      value: data?.id_card_type,
      icon: <UserSquare size={20} />,
    },
    {
      id: 4,
      label: "ID No.",
      value: data?.id_card_number,
      icon: <Hash size={20} />,
    },
  ];
  return (
    <Card className="dark:bg-black/40">
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          {data ? (
            <>
              <CardTitle className="text-lg">{data.name}</CardTitle>
              <FlagIcon code={data.country_iso} />
            </>
          ) : (
            <>
              <Skeleton className={`h-7 w-12 ${!loading && "animate-none"}`} />
              <Skeleton className={`h-7 w-16 ${!loading && "animate-none"}`} />
              <Skeleton className={` rounded-none h-7 w-8 ${!loading && "animate-none"}`} />
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 text-fore dark:text-fore-dark sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center gap-2 sm:flex-col sm:items-start"
          >
            <div className="sm:hidden">{field.icon}</div>
            <p className="hidden w-24 gap-1 font-semibold sm:flex">
              <span className="w-5">{field.icon}</span> {field.label}:
            </p>
            {data ? (
              <p className="rounded bg-muted/50 px-2 py-1 text-lg dark:bg-muted-dark">
                {field.value}
              </p>
            ) : (
              <Skeleton
                className={`h-9 w-24 rounded bg-muted/50 px-2 py-1 text-lg dark:bg-muted-dark ${
                  !loading && "animate-none"
                }`}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default GuestInfoCard;
