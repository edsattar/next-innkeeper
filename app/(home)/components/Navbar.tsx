import { cn } from "@/lib/utils";
import { jost } from "@/styles/fonts";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import MobileNavMenu from "./MobileNavMenu";
const navigation = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#about" },
  { name: "Rooms", href: "#rooms" },
  { name: "Restaurant", href: "#restaurant" },
];

interface Props {
  title: string;
}

const Navbar = ({ title }: Props) => {
  return (
      <nav
        className="flex items-center justify-between p-3 sm:p-6"
        aria-label="Global"
      >
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">{title}</span>
            <h1 className="smallcaps text-3xl font-bold tracking-tight">
              {title}
            </h1>
          </a>
        </div>

        {/* Nav Menu */}
        <div className="hidden md:flex md:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-base font-semibold uppercase leading-6 text-fore dark:text-fore-dark",
                jost.className,
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="ml-2 flex flex-row items-center gap-x-2">
          <MobileNavMenu navigation={navigation} />
        </div>
      </nav>

  );
};
export default Navbar;
