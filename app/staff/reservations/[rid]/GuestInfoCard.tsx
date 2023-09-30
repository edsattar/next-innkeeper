import FlagIcon from "@/components/FlagIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/db/schema";
import { Phone, Mail, UserSquare, Hash } from "lucide-react"

const GuestInfoCard = ({ customer_data }: { customer_data: Customer }) => {
  const data_formatted = [
    { label: "Phone", value: customer_data.phone, icon: <Phone /> },
    { label: "Email", value: customer_data.email, icon: <Mail /> },
    // { label: "ID Type", value: customer_data.id_card_type, icon: <UserSquare /> },
    // { label: "ID No.", value: customer_data.id_card_number, icon: <Hash /> },
  ];
  return (
    <Card className="bg-secondary dark:bg-secondary-dark">
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          <CardTitle className="text-lg">{customer_data.name}</CardTitle>
          <FlagIcon code={customer_data.country_iso} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 text-fore dark:text-fore-dark sm:grid-cols-2">
        {data_formatted.map((e) => (
          <p key={e.label} className="flex text-base">
            <div className="w-[35px]">
              {e.icon}
            </div>
            {e.value}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
export default GuestInfoCard;
