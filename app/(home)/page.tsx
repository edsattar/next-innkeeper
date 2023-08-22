import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import BlurPattern from "./components/BlurPattern";
import Hero from "./components/Hero";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { jost } from "@/styles/fonts";

export default function Home() {
  return (
    <div className="relative h-full w-full min-w-[450px] bg-back dark:bg-back-dark">
      <header className="absolute inset-x-0 top-0 z-50 min-w-[450px]">
        <TopBar />
        <Navbar />
      </header>

      <Hero />

      <div className="relative h-[480px] w-full px-6 pt-32 lg:px-8">
        <div className="absolute inset-x-0 z-10 h-full ">
          <div className="absolute inset-x-0 z-10 h-full bg-teal-950 opacity-80 "></div>
          <Image
            src="/hero.jpg"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
          />
        </div>
        <div className="absolute inset-x-0 top-64 z-20 mx-auto h-40 w-auto sm:top-60 sm:h-48">
          {/* <div className="absolute opacity-80 bg-back-dark w-full h-full"></div> */}
          <div className="absolute my-8 h-full w-full text-center text-fore-dark">
            <p
              className={cn(
                "my-4 text-sm leading-8  sm:text-lg",
                jost.className,
              )}
            >
              Welcome To
            </p>
            <h1 className="smallcaps text-5xl font-bold tracking-tight  sm:text-6xl">
              The Civic Inn
            </h1>
            <p
              className={cn(
                "my-4 text-sm leading-8  sm:text-lg",
                jost.className,
              )}
            >
              Location Comfort Value
            </p>
          </div>
        </div>
      B</div>


    </div>
  );
}
