import FlagIcon from "@/components/FlagIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/db/schema";

const data: Customer = {
  id: 0,
  name: "John Doe",
  phone: "+8801710000000",
  email: "john.doe@example.com",
  country_iso: "BD",
  id_card_type: "Passport",
  id_card_number: "ABCD1234",
  created_at: null,
  updated_at: null,
};


const GuestInfoCard = ({ customer_data }: { customer_data: Customer }) => {
  const data_formatted = [
    { label: "Phone", value: customer_data.phone },
    { label: "Email", value: customer_data.email },
    { label: "ID Type", value: customer_data.id_card_type },
    { label: "ID No.", value: customer_data.id_card_number },
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
          <p key={e.label} className="flex text-sm">
            <div className="w-[72px]">
              <Badge variant={"outline"}>{e.label}</Badge>
            </div>
            {e.value}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
export default GuestInfoCard;
