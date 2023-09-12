"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  navigation: {
    name: string;
    href: string;
  }[];
}

export function MainNav({
  className,
  navigation,
  ...props
}: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navigation.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn("text-sm font-medium transition-colors hover:text-primary dark:hover:text-fore-dark",
              isActive ? "text-fore dark:text-fore-dark" : "text-fore/50 dark:text-fore-dark/50",
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
