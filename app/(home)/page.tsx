import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import BlurPattern from "./components/BlurPattern";
import Hero from "./components/Hero";
import { cn } from "@/lib/utils";
import { jost, josefin } from "@/styles/fonts";
import HeroCarousel from "./components/HeroCarousel";
import Demo from "./components/Demo";
import Section from "./components/Section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import heroImage from "@/public/building_front_bw.webp";

export default function Home() {
  const title = "The Civic Inn";
  return (
    <div className="relative h-full w-full min-w-[396px]">
      <div className="sticky inset-x-0 z-50 bg-back dark:bg-back-dark">
        <div className="container">
          <TopBar />
          <Separator />
          <Navbar title={title} />
        </div>
      </div>
      <div className="relative h-[480px]">
        <Image src="https://lh3.googleusercontent.com/drive-viewer/AITFw-zwXWoIrV4v14A77Il5V1PY9BU7y4i4hT_J5TNczeaiTJPdIp5MldnWsU7SYa5mQOX9dfaZwD-QvRzw_MUHqtHJ7TJPIw=w2880-h1629" fill alt="building_front" priority className="object-cover" />
        <div className="absolute inset-x-0 flex h-full flex-col justify-center bg-back-dark/50 text-center text-fore-dark">
          <p className={cn("my-4 text-2xl sm:text-3xl", josefin.className)}>Welcome To</p>
          <h1 className="smallcaps text-6xl font-bold tracking-tight sm:text-8xl">{title}</h1>
          <p className={cn("my-4 text-xl sm:text-2xl", josefin.className)}>Location • Comfort • Value</p>
        </div>
      </div>
      <HeroCarousel />
      <div className="relative h-[480px] bg-back-dark/80 dark:bg-back/80"></div>

      {/* <Demo /> */}
    </div>
  );
}
