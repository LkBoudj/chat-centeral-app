"use client";
import { cn } from "@/lib/utlis";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";

import { usePathname } from "next/navigation";

import NavContainer from "./NavContainer";

type Props = {
  navsData: NavItem[];
};

const LkNavbar = ({ navsData }: Props) => {
  const pathName = usePathname();

  return (
    <NavContainer>
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
              {/* <Icon className={color} size={16} /> */}
              {/* <div
                  className="w-[20px] h-[20px] overflow-hidden bg-[url('/images/g.png')] bg-cover bg-repeat-none"
                  style={{ backgroundPositionX, backgroundPositionY }}
                ></div> */}
              <span>{name}</span>
            </NavbarItem>
          )
        )}
      </NavbarContent>
    </NavContainer>
  );
};

export default LkNavbar;
