"use Client";
import React, { useContext } from "react";

import { ConfigContext } from "@/components/context/ConfigProvider";
import NavContainer from "../NavContainer";
import GuestDesktopNav from "./GuestDesktopNav";
import GuestMobile from "./GuestMobile";

type Props = {};

const GuestNav = (props: Props) => {
  const { dataOfNav, activeItem, handelClick } = useContext(ConfigContext);
  return (
    <NavContainer>
      <GuestDesktopNav
        data={dataOfNav}
        activeItem={activeItem}
        handelClick={handelClick}
      />
      <GuestMobile
        data={dataOfNav}
        activeItem={activeItem}
        handelClick={handelClick}
      />
    </NavContainer>
  );
};

export default GuestNav;
