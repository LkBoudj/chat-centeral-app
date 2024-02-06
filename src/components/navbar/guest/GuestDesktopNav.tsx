import { NavbarContent, NavbarItem, cn } from "@nextui-org/react";
import React from "react";

type Props = {};

const GuestDesktopNav = ({ data, handelClick, activeItem }: any) => {
  return (
    <NavbarContent
      className="hidden space-x-2 sm:flex gap-4 w-full"
      justify="start"
    >
      {data?.map((val: any) => {
        return (
          <NavbarItem
            onClick={() => handelClick(val)}
            key={val.name}
            className={cn(
              val.name.toLowerCase() == activeItem
                ? "text-blue-500"
                : "text-black"
            )}
          >
            {val.name}
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );
};

export default GuestDesktopNav;
