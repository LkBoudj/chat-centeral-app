"use client";
import { cn } from "@/lib/utlis";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";

import { usePathname } from "next/navigation";

import NavContainer from "./NavContainer";

type Props = {
  navsData: NavItem[];
  endContent?: React.ReactNode;
};

const LkNavbar = ({ navsData, endContent }: Props) => {
  const pathName = usePathname();

  return (
    <NavContainer endContent={endContent}>
      <NavbarContent
        className="hidden space-x-2 sm:flex gap-4 w-full"
        justify="start"
      >
        {navsData?.map(
          ({
            Icon,
            path,
            name,
            color,
            backgroundPositionX,
            backgroundPositionY,
          }: NavItem) => (
            <NavbarItem
              key={name}
              className={cn(
                " capitalize px-2 space-x-1 font-medium py-2 items-center text-sm text-slate-800",
                pathName == path && "border-b-2 border-blue-500 font-semibold"
              )}
              as={Link}
              href={path}
            >
              <span>{name}</span>
            </NavbarItem>
          )
        )}
      </NavbarContent>
    </NavContainer>
  );
};

export default LkNavbar;
