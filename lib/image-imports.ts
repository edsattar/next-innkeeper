import front_desk from "@/public/front_desk.jpg";
import lobby_a from "@/public/lobby_a.jpg";
import lobby_b from "@/public/lobby_b.jpg";
import restaurant_a from "@/public/restaurant_a.jpg";
import restaurant_b from "@/public/restaurant_b.jpg";
import building_front from "@/public/building_front.jpg";
import { StaticImageData } from "next/image";

type HeroCarouselSlide = {
  id: number;
  src: StaticImageData;
  alt: string;
  subtitle: string;
  description: string;
};

export const hero_carousel_slides: HeroCarouselSlide[] = [
  {
    id: 1,
    src: front_desk,
    alt: "front_desk",
    subtitle: "front_desk",
    description: "front_desk",
  },
  {
    id: 2,
    src: lobby_a,
    alt: "lobby_a",
    subtitle: "lobby_a",
    description: "lobby_a",
  },
  {
    id: 3,
    src: lobby_b,
    alt: "lobby_b",
    subtitle: "lobby_b",
    description: "lobby_b",
  },
  {
    id: 4,
    src: restaurant_a,
    alt: "restaurant_a",
    subtitle: "restaurant_a",
    description: "restaurant_a",
  },
  {
    id: 5,
    src: restaurant_b,
    alt: "restaurant_b",
    subtitle: "restaurant_b",
    description: "restaurant_b",
  },
  {
    id: 6,
    src: building_front,
    alt: "building_front",
    subtitle: "building_front",
    description: "building_front",
  },
];
