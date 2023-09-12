import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fmtCurrency, fmtPercentage } from "@/lib/utils";
import { DollarSignIcon } from "lucide-react";

interface Props {
  title: string;
  amount: number;
  prevAmount?: number;
}

const CardMoney = ({ title, amount, prevAmount}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {title}
        <DollarSignIcon className="h-5" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{fmtCurrency(amount)}</div>
        {prevAmount && (
          <p className="text-muted-foreground text-xs">
            {fmtPercentage((amount - prevAmount) / prevAmount)} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};
export default CardMoney;
