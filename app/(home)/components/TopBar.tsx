"use client";

import { Phone, CalendarClock } from "lucide-react";

import { useState, useEffect } from "react";
import { format, utcToZonedTime } from "date-fns-tz";

import { DarkModeToggle } from "@/components/DarkModeToggle";

import { playfair } from "@/fonts";

const TopBar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000); // Update every minute

    // Clear interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Convert to GMT+6
  const timeZone = "Asia/Dhaka"; // Dhaka is in GMT+6
  const zonedDate = utcToZonedTime(date, timeZone);

  // Format the date and time
  const formatString = "dd MMM, hh:mm a";
  const formattedDate = format(zonedDate, formatString, { timeZone });

  return (
    <div className="flex h-8 items-center text-center text-sm font-medium opacity-80">
      <div className="flex gap-x-5">
        <p className={playfair.className}>
          <Phone className="mb-1 mr-2 inline-block h-4 w-4" />
          +880-1994-851928
        </p>
         <p className={playfair.className}>
          <CalendarClock className="mb-1 mr-2 inline-block h-4 w-4" />
          {formattedDate}
        </p>
      </div>
      <div className="flex-grow"></div>
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
};
export default TopBar;
