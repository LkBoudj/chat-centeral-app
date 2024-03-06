"use client";
import { cn } from "@/lib/utlis";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import AuthanticationButton from "./AuthanticationButton";
import { LogoIcon } from "..";
import { useState } from "react";

export interface PropsNavContainer
  extends React.ComponentPropsWithoutRef<"nav"> {
  children?: React.ReactNode;
  endContent?: React.ReactNode;
}

const NavContainer = (props: PropsNavContainer) => {
  const { children, endContent, className, ...rest } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      isBlurred={false}
      maxWidth="full"
      {...rest}
      className={cn(" z-40   ", className)}
    >
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
        <NavbarItem className="flex">
          <AuthanticationButton />
        </NavbarItem>
        {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
      </NavbarContent>
    </Navbar>
  );
};

export default NavContainer;
