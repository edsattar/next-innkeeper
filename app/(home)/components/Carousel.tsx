"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import Image from "next/image";

interface Props {
  slides: {
    id: number;
    src: string;
    alt: string;
    subtitle: string;
    description: string;
  }[];
}

const Carousel = ({ slides }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  return (
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((e) => (
              <div key={e.id} className="min-w-0 flex-2 px-1 py-8 sm:px-8 ">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    fill
                    src={e.src}
                    className="object-cover"
                    alt={e.alt}
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="carousel"
          className="absolute bottom-4 right-[51%]"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="carousel"
          className="absolute bottom-4 left-[51%]"
          onClick={scrollNext}
        >
          <ChevronRight />
        </Button>
      </div>

  );
};

export default Carousel;
