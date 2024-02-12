import DashUserContextProvider from "@/components/context/dashboard/DashUserContextProvider";
import React, { PropsWithChildren } from "react";

const TechTemplate = ({ children }: PropsWithChildren) => {
  return <DashUserContextProvider>{children}</DashUserContextProvider>;
};

export default TechTemplate;
