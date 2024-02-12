import TechnologyContextProvider from "@/components/context/dashboard/TechnologyContextProvider";
import React, { PropsWithChildren } from "react";

const TechTemplate = ({ children }: PropsWithChildren) => {
  return <TechnologyContextProvider>{children}</TechnologyContextProvider>;
};

export default TechTemplate;
