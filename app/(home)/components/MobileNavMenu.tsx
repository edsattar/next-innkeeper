"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  navigation: {
    name: string;
    href: string;
  }[];
}

const MobileNavMenu = ({ navigation }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <div className="flex md:hidden">
        <Button
          variant="link"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        </Button>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-back p-3 dark:bg-back-dark sm:max-w-xs sm:p-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between px-2">
            <a href="#" className="-m-1.5 p-1.5 pt-2 sm:invisible">
              <span className="sr-only">The Civic Inn</span>
              <h1 className="smallcaps text-3xl font-bold tracking-tight">
                The Civic Inn
              </h1>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="mr-2 h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-fore hover:bg-muted dark:text-fore-dark dark:hover:bg-muted-dark"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default MobileNavMenu;
