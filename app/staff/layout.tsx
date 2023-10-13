import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { inter } from "@/styles/fonts";
import { MainNav } from "./dash/components/main-nav";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const navigation = [
  { name: "Dash", href: "/staff/dash" },
  { name: "Reservations", href: "/staff/reservations" },
  { name: "Products", href: "/staff/products" },
  { name: "Settings", href: "/staff/settings" },
];

interface Props {
  children: React.ReactNode;
}

const StaffLayout = async ({ children }: Props) => {
  const session = await getServerSession(options);

  if (!session || !["admin", "manager"].includes(session.user.role)) {
    redirect("/api/auth/signin?callbackUrl=/staff/reservations");
  }

  return (
    <div className={inter.className}>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="ml-6 mr-5" navigation={navigation} />
            <div className="ml-auto flex items-center space-x-4">
              <DarkModeToggle />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default StaffLayout;
