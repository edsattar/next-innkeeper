"use client";

import { Phone, CalendarClock } from "lucide-react";

import { useState, useEffect } from "react";
import { format, utcToZonedTime } from "date-fns-tz";

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
      <div className="flex flex-wrap text-sm text-center font-medium text-fore/70 dark:text-fore-dark/70 gap-x-5 p-2">
        <p className={playfair.className}>
          <Phone className="inline-block w-4 h-4 mr-2 mb-1" />
          +880-1994-851928
        </p>
        <p className={playfair.className}>
          <CalendarClock className="inline-block w-4 h-4 mr-2 mb-1" />
          {formattedDate} (+6)
        </p>
      </div>
  );
};
export default TopBar;
