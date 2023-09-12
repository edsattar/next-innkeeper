import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentSales } from "./recent-sales";
import { Overview } from "./overview";

import CardMoney from "./CardMoney";

const OverviewTab = () => {
  const revenue = 12345.4;
  const prevRevenue = 29111;
  const sales = 2350;
  const prevSales = 1234;


  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardMoney title="Revenue" amount={revenue} prevAmount={prevRevenue} />
        <CardMoney title="Sales" amount={sales} prevAmount={prevSales} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default OverviewTab;
