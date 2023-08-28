import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import BlurPattern from "./components/BlurPattern";
import Hero from "./components/Hero";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { jost } from "@/styles/fonts";
import HeroCarousel from "./components/HeroCarousel";
import Demo from "./components/Demo";
import Section from "./components/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const title = "The Civic Inn";
  return (
    <div className="relative h-full w-full min-w-[396px]">
      <header className="sticky inset-x-0 top-0 z-50 bg-back dark:bg-back-dark">
        <TopBar />
        <Navbar title={title} />
      </header>
      <Section>
        <Hero title={title} />
      </Section>
      <Section className="h-[700px]">
        <HeroCarousel />
      </Section>
      <Section className="bg-lime-900/20">
      </Section>

      {/* <Demo /> */}
    </div>
  );
}
