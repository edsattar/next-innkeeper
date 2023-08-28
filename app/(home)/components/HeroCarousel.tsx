"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight  } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { hero_carousel_slides as slides } from "@/lib/image-imports";

const HeroCarousel = () => {
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
    <>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-8 top-1/3 z-50 h-40"
        onClick={scrollNext}
      >
        <ChevronRight className="h-32 w-32" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-8 top-1/3 z-50 h-40"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-32 w-32" />
      </Button>
      <div className="overflow-hidden" ref={emblaRef}>
        {/* viewport */}
        <div className="ml-[calc(1rem * -1)] flex touch-pan-y">
          {/* container */}
          {slides.map((e) => (
            <div key={e.id} className="min-w-0 flex-2 p-8">
              {/* slide */}
              <Card className="h-full overflow-hidden rounded-none border-none shadow-md">
                <AspectRatio ratio={3 / 2}>
                  <CardContent className="relative h-full w-full p-2 ">
                    <Image
                      // height={400}
                      // width={800}
                      fill
                      src={e.src}
                      className="object-cover"
                      alt={e.alt}
                    />
                  </CardContent>
                </AspectRatio>
                <CardFooter className="h-auto bg-back dark:bg-back-dark">
                  <p>{e.description}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default HeroCarousel;
