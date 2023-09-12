import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CalendarDateRangePicker } from "./components/date-range-picker";
import { Search } from "./components/search";
import TeamSwitcher from "./components/team-switcher";
import { UserNav } from "../../../components/user-nav";

import OverviewTab from "./components/OverviewTab";
import { MainNav } from "./components/main-nav";
import { inter } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { db } from "@/db";
import { room_types, users } from "@/db/schema";
import ReservationTab from "./components/ReservationTab";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const result = await db.select().from(room_types);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          {/* <CalendarDateRangePicker /> */}
          {/* <Button>Download</Button> */}
        </div>
      </div>
      <Tabs defaultValue="reservations" className="space-y-4">
        {/* prettier-ignore */}
        <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
            </TabsList>
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="reservations">
          <ReservationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
