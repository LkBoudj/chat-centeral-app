"use client";
import { cn } from "@/lib/utlis";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { Bot } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  navsData: NavItem[];
};

const LkNavbar = ({ navsData }: Props) => {
  const pathName = usePathname();

  return (
    <Navbar isBlurred={false} maxWidth="full" className=" z-40   ">
      <div className="mr-8">
        <NavbarBrand className="flex items-center space-x-1">
          <Bot size={30} className="text-blue-800" />
          <p className="font-bold text-inherit">CENTERAL</p>
        </NavbarBrand>
      </div>

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
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            as={Link}
            className="border-r rounded-none text-slate-700"
            color="primary"
            href="#"
            variant="light"
          >
            Sign In
          </Button>
          <Button
            className="text-slate-700"
            as={Link}
            color="primary"
            href="#"
            variant="light"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default LkNavbar;
