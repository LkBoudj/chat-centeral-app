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
  const { isUploadFileOpen, setFile, onClose } = useContext(globalContext);
  const handelSelectFile = (e: any) => {
    setFile(e);
    onClose();
  };
  return (
    <dashboardContext.Provider value={{}}>
      {isUploadFileOpen && (
        <UploadExplorer types={["image"]} handelSelectFile={handelSelectFile} />
      )}

      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardContextProvider;
