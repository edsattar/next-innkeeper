"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { hero_carousel_slides as slides } from "@/lib/image-imports";

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative container">
      <div className="overflow-hidden" ref={emblaRef}>
        {/* viewport */}
        <div className="flex">
          {/* container */}
          {slides.map((e) => (
            <div key={e.id} className="min-w-0 flex-2 p-8 pb-2">
              {/* slide */}
              <Card className="h-full border-none overflow-hidden">
                <AspectRatio ratio={3 / 2}>
                  <CardContent className="relative h-full w-full overflow-hidden p-2 ">
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
                {/* <CardFooter className="h-auto bg-back dark:bg-back-dark">
                  <p>{e.description}</p>
                </CardFooter> */}
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Button variant="carousel" className="absolute right-[51%] bottom-3" onClick={scrollPrev}>
        <ChevronLeft />
      </Button>
      <Button variant="carousel" className="absolute left-[51%] bottom-3" onClick={scrollNext}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default HeroCarousel;
