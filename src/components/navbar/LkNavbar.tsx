"use client";
import { cn } from "@/lib/utlis";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";

import { usePathname } from "next/navigation";

import NavContainer from "./NavContainer";

export interface PropsLkNavbar extends React.ComponentPropsWithoutRef<"nav"> {
  navsData: NavItem[];
  endContent?: React.ReactNode;
}
const LkNavbar = (props: PropsLkNavbar) => {
  const { navsData, endContent, className, ...rest } = props;
  const pathName = usePathname();

  return (
    <NavContainer endContent={endContent} className={className}>
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
