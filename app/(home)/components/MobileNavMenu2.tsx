"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Menu } from "lucide-react";

interface Props {
  navigation: {
    name: string;
    href: string;
  }[];
}

const MobileNavMenu = ({ navigation }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <span className="sr-only">Open main menu</span>
          <Menu
            className="h-[1.2rem] w-[1.2rem]"
            aria-hidden="true"
          />
        </Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>The Civic Inn</DialogTitle>
      </DialogHeader>
    </Dialog>
  );
};

export default MobileNavMenu;
