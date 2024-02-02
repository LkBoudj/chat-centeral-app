import TechnologyContextProvider from "@/components/context/TechnologyContextProvider";
import React, { PropsWithChildren } from "react";

const TechTemplate = ({ children }: PropsWithChildren) => {
  return <TechnologyContextProvider>{children}</TechnologyContextProvider>;
};

export default TechTemplate;
