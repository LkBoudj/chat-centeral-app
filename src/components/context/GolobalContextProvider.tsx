"use client";
import { useDisclosure } from "@nextui-org/react";
import { Media } from "@prisma/client";
import React, { createContext, useState } from "react";

type GlobalContextProps = {
  isUploadFileOpen?: boolean;
  onOpenUploadFile?: () => void;
  onOpenChangeUloadFile?: (key?: any) => void;
  onClose: () => void;
  file: Media | null;
  setFile: (file?: Media | null) => void;
  progress: number;
  setProgress: (key: number) => void;
};
export const globalContext = createContext<GlobalContextProps>({
  progress: 0,
  file: null,
  isUploadFileOpen: false,
  setProgress: function (key: number) {},
  onClose: function () {},
  setFile: function (key?: Media | null) {},
});

const GolobalContextProvider = ({
  children,
  defaultVal,
}: {
  children: React.ReactNode;
  defaultVal: any;
}) => {
  const [copy, setCopy] = useState<boolean>(false);
  const [file, setFile] = useState<Media>();
  const [progress, setProgress] = useState(0);
  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUloadFile,
    onClose,
  } = useDisclosure();

  const value = {
    ...defaultVal,
    isUploadFileOpen,
    onOpenUploadFile,
    onOpenChangeUloadFile,
    file,
    setFile,
    progress,
    setProgress,
    onClose,
  };
  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export default GolobalContextProvider;
