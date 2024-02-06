import React, { LegacyRef } from "react";
import MainLeft from "./components/MainLeft";
import MainRight from "./components/MainRight";
import { ContainerMaxWind } from "@/components";

type Props = {
  id?: LegacyRef<HTMLElement>;
};

const Main = ({ id }: Props) => {
  return (
    <main ref={id} className="w-full bg-main">
      <ContainerMaxWind className="flex py-24 justify-between items-center ">
        <MainLeft
          title="Answers & Chat artificial intelligence"
          description="Quisque convallis dolor a risus luctus, et tempor massa finibus. In egestas massa et lorem tempor, vel consequat "
        />
        <MainRight src="/images/main.png" />
      </ContainerMaxWind>
    </main>
  );
};

export default Main;
