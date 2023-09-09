import { hasFlag } from "country-flag-icons";
import Image from "next/image";
import blank from "@/public/xx.svg";

interface Props {
  code: string;
}

const FlagIcon = ({ code }: Props) => {
  return (
    <div className="w-8">
      {hasFlag(code) && (
        <Image
          height={20}
          width={20}
          alt={code}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
          placeholder="empty"
        />
      )}
    </div>
  );
};
export default FlagIcon;
