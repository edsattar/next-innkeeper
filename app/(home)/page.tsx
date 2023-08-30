import { cn } from "@/lib/utils";
import { jost, josefin, playfair } from "@/styles/fonts";

import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import {
  hero_slides,
  room_slides,
  restaurant_slides,
} from "@/lib/image-imports";

import { reviews } from "@/lib/customer_reviews";
import Carousel from "./components/Carousel";
import Section from "./components/Section";

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
      <Section id="about">
        <Carousel slides={hero_slides} />
        <div className="flex justify-center p-8 pt-1 text-center text-base sm:text-xl">
          <p className="p-4">
            We are located within 1.6 mi of Shahjalal International Airport
          </p>
        </div>
      </Section>

      {/* Rooms */}

      <Section variant="dark" title="Rooms" id="rooms">
        <Carousel slides={room_slides} />
        <div className="flex justify-center p-12 pt-1 text-center text-base sm:text-xl">
          <p>
            The units at the hotel come with air-conditioning, cabinet, desk and
            a flat-screen TV. Every room includes a kettle, while certain rooms
            include a kitchenette with an oven and a microwave.
          </p>
        </div>
      </Section>

      {/* Restaurant */}
      <Section title="Restaurant" id="restaurant">
        <Carousel slides={restaurant_slides} />
        <div className="flex justify-center p-12 pt-1 text-center text-base sm:text-xl">
          <p>
            At Civic Inn you will find a restaurant serving Indian, Chinese and
            Oriental cuisine. A halal continental breakfast is available every
            morning at the restaurant. A vegan option can also be requested.
          </p>
        </div>
      </Section>

      {/* Reviews */}
      <Section variant="dark" title="Reviews" id="review">
        <div className="flex flex-col justify-center gap-8 p-12 sm:flex-row">
          {reviews.map((e) => (
            <div key={e.id} className="flex flex-col gap-4 sm:gap-6">
              <p className="rounded bg-stone-900/20 p-5">
                &quot;{e.review}&quot;
              </p>
              <p className="pl-5">{e.name}</p>
              <p className="pl-5">{e.source}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Location" id="location">
        <div className="h-[480px] w-full overflow-hidden rounded-md p-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d912.1043451626773!2d90.389905!3d23.874814!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUyJzI5LjgiTiA5MMKwMjMnMjMuNyJF!5e0!3m2!1sen!2sus!4v1693414351373!5m2!1sen!2sus"
            height="100%"
            width="100%"
            allowFullScreen
            className="rounded"
            loading="lazy"
          />
        </div>
        <div
          className={cn(
            "flex flex-col items-center justify-center p-12 pt-1 text-center text-base sm:text-lg",
            jost.className,
          )}
        >
          <p>House 12, Road 20, Sector 11, Uttara, Dhaka 1230, Bangladesh</p>
          <div id="contact" className="w-[480px] rounded bg-stone-900/10 m-8 p-8">
            <p className={cn("pb-6 text-2xl ", playfair.className)}>Contact us</p>
            <p>Email: contact@thecivicinn.com, civicinn1988@gmail.com</p>
            <p>Land: +880 24895-6781, 6782</p>
            <p>Mob:  +880 181110-6782, 6791</p>
            <p>Whatsapp: +880 1994-851928</p>
            <p>https://www.facebook.com/civicinn</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
