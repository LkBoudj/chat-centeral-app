import UploadExplorer from "@/components/global/explorer/UploadExplorer";
import React, { useContext } from "react";
import { createContext } from "react";
import { globalContext } from "../GlobalContextProvider";

type Props = {
  children: React.ReactNode;
  defaultVal?: any;
};

export const dashboardContext = createContext<any>(null);
const DashboardContextProvider = ({ children, defaultVal }: Props) => {
  return (
    <dashboardContext.Provider value={{}}>{children}</dashboardContext.Provider>
  );
};

export default DashboardContextProvider;
