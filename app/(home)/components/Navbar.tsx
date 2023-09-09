import { cn } from "@/lib/utils";
import { jost, playfair } from "@/styles/fonts";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import MobileNavMenu from "./MobileNavMenu";


interface Props {
  title: string;
  navigation: {
    name: string;
    href: string;
  }[];
}

const Navbar = ({ title, navigation }: Props) => {
  return (
      <nav
        className="flex items-center justify-between p-6"
        aria-label="Global"
      >
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">{title}</span>
            <h1 className={cn("smallcaps text-3xl font-bold tracking-tight", playfair.className)}>
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
              className={cn("text-base font-semibold uppercase leading-6 text-fore dark:text-fore-dark", jost.className)} >
              {item.name}
            </a>
          ))}
        </div>
        <div className="ml-2 flex flex-row items-center gap-x-2">
          <MobileNavMenu navigation={navigation} />
          <DarkModeToggle />
        </div>
      </nav>

  );
};
export default Navbar;
