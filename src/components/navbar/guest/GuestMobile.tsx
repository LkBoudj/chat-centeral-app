import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  cn,
} from "@nextui-org/react";
import React from "react";

type Props = {};

const GuestMobile = ({ data, handelClick, activeItem }: any) => {
  return (
    <NavbarMenu className="lg:hidden  flex items-center justify-center gap-4 w-full">
      {data?.map((val: any) => {
        return (
          <NavbarMenuItem
            onClick={() => handelClick(val)}
            key={val.name}
            className={cn(
              val.name.toLowerCase() == activeItem
                ? "text-blue-500"
                : "text-black"
            )}
          >
            {val.name}
          </NavbarMenuItem>
        );
      })}
    </NavbarMenu>
  );
};

export default GuestMobile;
