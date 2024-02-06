"use client";
import { cn } from "@/lib/utlis";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import AuthanticationButton from "./AuthanticationButton";
import { LogoIcon } from "..";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const NavContainer = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar isBlurred={false} maxWidth="full" className=" z-40   ">
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <div className="mr-8">
        <NavbarBrand className="flex items-center space-x-1">
          <LogoIcon />
        </NavbarBrand>
      </div>
      {children}

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <AuthanticationButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavContainer;
