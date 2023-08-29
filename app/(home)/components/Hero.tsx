import { cn } from "@/lib/utils";
import { josefin as font } from "@/styles/fonts";
import Image from "next/image";
import heroImage from "@/public/building_front_bw.png";

interface Props {
  title: string;
}
const Hero = ({title}: Props) => {
  return (
    <>
      <div className="relative h-[580px] w-full">
        {/* <div className="absolute inset-x-0 z-10 h-full bg-back-dark opacity-50 "></div> */}
        <Image
          fill
          src={heroImage}
          alt="Hero"
          className="object-cover"
        />
      </div>

      {/* prettier-ignore */}
      {/* <div className="absolute flex flex-col inset-x-0 h-full w-full z-20 mx-auto text-center justify-center text-fore-dark">
          <p className={cn("my-4 text-2xl leading-8 sm:text-3xl", font.className)}>
            Welcome To
          </p>
          <h1 className="smallcaps text-6xl font-bold tracking-tight sm:text-8xl">
            {title}
          </h1>
          <p className={cn("my-4 text-xl leading-8 sm:text-2xl", font.className)}>
            Location • Comfort • Value
          </p>
      </div> */}
    </>
  );
};
export default Hero;
