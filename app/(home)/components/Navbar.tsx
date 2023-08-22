import { cn } from "@/lib/utils";
import { jost } from "@/styles/fonts";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import MobileNavMenu from "./MobileNavMenu";
const navigation = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Our Rooms", href: "#" },
  { name: "Contact", href: "#" },
];
const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-between p-6"
      aria-label="Global"
    >
      <div className="flex">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">The Civic Inn</span>
          <h1 className="smallcaps text-3xl font-bold tracking-tight">
            The Civic Inn
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
        <DarkModeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
