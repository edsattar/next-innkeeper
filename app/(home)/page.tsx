import { cn } from "@/lib/utils";
import { josefin } from "@/styles/fonts";

import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import {
  hero_slides,
  room_slides,
  restaurant_slides,
} from "@/lib/image-imports";
import Carousel from "./components/Carousel";

export default function Home() {
  const title = "The Civic Inn";

  return (
    <div className="relative w-full min-w-[396px]">
      <div className="sticky inset-x-0 top-0 z-50 bg-back dark:bg-back-dark">
        <div className="px-2 sm:container">
          {/* <TopBar /> */}
          {/* <Separator className="bg-border-dark opacity-50 dark:bg-border" /> */}
          <Navbar title={title} />
        </div>
      </div>
      <div className="relative top-0 h-[380px]">
        <Image
          src="https://lh3.googleusercontent.com/drive-viewer/AITFw-zwXWoIrV4v14A77Il5V1PY9BU7y4i4hT_J5TNczeaiTJPdIp5MldnWsU7SYa5mQOX9dfaZwD-QvRzw_MUHqtHJ7TJPIw=w2880-h1629"
          fill
          alt="building_front"
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 flex h-full flex-col justify-center bg-back-dark/80 text-center text-fore-dark">
          <p className={cn("my-4 text-2xl sm:text-3xl", josefin.className)}>
            Welcome To
          </p>
          <h1 className="smallcaps text-6xl font-bold tracking-tight sm:text-8xl">
            {title}
          </h1>
          <p className={cn("my-4 text-xl sm:text-2xl", josefin.className)}>
            Location • Comfort • Value
          </p>
        </div>
      </div>

      {/* About? */}
      <div
        id="about"
        className="before:invisible before:mt-[-83px] before:block before:h-[83px]"
      >
        <div className="mx-auto max-w-screen-2xl">
          <Carousel slides={hero_slides} />
          <div className="flex justify-center p-8 pt-1 text-center text-base sm:text-2xl">
            <p className="p-4">
              We are located within 1.6 mi of Shahjalal International Airport
            </p>
          </div>
        </div>
      </div>

      {/* Rooms */}
      <div
        id="rooms"
        className="before:invisible before:mt-[-83px] before:block before:h-[83px]"
      >
        <div className="bg-back-dark text-fore-dark dark:bg-back dark:text-fore">
          <div className="mx-auto max-w-screen-2xl">
            <div className="flex justify-center pt-8 text-center text-base sm:text-3xl">
              <h1>Rooms</h1>
            </div>
            <Carousel slides={room_slides} />
            <div className="flex justify-center p-12 pt-1 text-center text-base sm:text-2xl">
              <p>
                The units at the hotel come with air-conditioning, cabinet, desk
                and a flat-screen TV. Every room includes a kettle, while
                certain rooms include a kitchenette with an oven and a
                microwave.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant */}
      <div
        id="restaurant"
        className="before:invisible before:mt-[-83px] before:block before:h-[83px]"
      >
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex justify-center pt-8 text-center text-base sm:text-3xl">
            <h1>Restaurant</h1>
          </div>
          <Carousel slides={restaurant_slides} />
          <div className="flex justify-center p-12 pt-1 text-center text-base sm:text-2xl">
            <p>
              At Civic Inn you will find a restaurant serving Indian, Chinese
              and Oriental cuisine. A halal continental breakfast is available
              every morning at the restaurant. A vegan option can also be
              requested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
