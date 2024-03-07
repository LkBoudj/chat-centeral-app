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
          title="ChatCentral: Access the Best AI Models & Technologies in One Hub"
          description="Transform your workflow with ChatCentral. Access the best AI technologies for faster, smarter work—from anywhere. Simplify processes and unlock new possibilities, all within a single, powerful platform."
        />
        <MainRight src="/images/main.png" />
      </ContainerMaxWind>
    </main>
  );
};

export default Main;
