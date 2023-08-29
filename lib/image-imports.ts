import { StaticImageData } from "next/image";

type HeroCarouselSlide = {
  id: number;
  src: string;
  alt: string;
  subtitle: string;
  description: string;
};

export const hero_carousel_slides: HeroCarouselSlide[] = [
  {
    id: 1,
    src: "/front_desk.jpg",
    alt: "front_desk",
    subtitle: "front_desk",
    description: "front_desk",
  },
  {
    id: 2,
    src: "/lobby_a.jpg",
    alt: "lobby_a",
    subtitle: "lobby_a",
    description: "lobby_a",
  },
  {
    id: 3,
    src: "/lobby_b.jpg",
    alt: "lobby_b",
    subtitle: "lobby_b",
    description: "lobby_b",
  },
  {
    id: 4,
    src: "/restaurant_a.jpg",
    alt: "restaurant_a",
    subtitle: "restaurant_a",
    description: "restaurant_a",
  },
  {
    id: 5,
    src: "/restaurant_b.jpg",
    alt: "restaurant_b",
    subtitle: "restaurant_b",
    description: "restaurant_b",
  },
  {
    id: 6,
    src: "/building_front.jpg",
    alt: "building_front",
    subtitle: "building_front",
    description: "building_front",
  },
  {
    id: 7,
    src: "/grid.jpg",
    alt: "grid",
    subtitle: "grid",
    description: "grid",
  },
];
