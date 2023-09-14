import { hasFlag } from "country-flag-icons";
import Image from "next/image";
import blank from "@/public/xx.svg";
import { cn } from "@/lib/utils";

interface Props {
  code: string;
  className?: string;
}

const FlagIcon = ({ className, code }: Props) => {
  return (
    <div className={cn("relative w-6 h-6", className)}>
      {hasFlag(code) && (
        <Image
        fill
          alt={code}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
          placeholder="empty"
        />
      )}
    </div>
  );
};
export default FlagIcon;
