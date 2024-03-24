"use client";
import { useDisclosure } from "@nextui-org/react";
import { Media } from "@prisma/client";
import React, { createContext, useState } from "react";
import FileManager from "../global/explorer/FileManager";
import { useSession } from "next-auth/react";

type GlobalContextProps = {
  isUploadFileOpen?: boolean;
  onOpenUploadFile?: () => void;
  onOpenChangeUploadFile?: (key?: any) => void;
  onClose: () => void;
  file: Media | null;
  setFile: (file?: Media | null) => void;
  progress: number;
  setProgress: (key: number) => void;
};
export const globalContext = createContext<any>({
  progress: 0,
  file: null,
  isUploadFileOpen: false,
  setProgress: function (key: number) {},
  onClose: function () {},
  setFile: function (key?: Media | null) {},
});

const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  defaultVal?: any;
}) => {
  const [copy, setCopy] = useState<boolean>(false);
  const [file, setFile] = useState<Media>();
  const [files, setFiles] = useState<Media[]>([]);
  const [progress, setProgress] = useState(0);
  const { data: session, status } = useSession();
  const sessionUser = session?.user;
  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUploadFile,
    onClose,
  } = useDisclosure();

  const value = {
    isUploadFileOpen,
    onOpenUploadFile,
    onOpenChangeUploadFile,
    file,
    setFile,
    progress,
    setProgress,
    onClose,
    files,
    setFiles,
    sessionUser,
  };
  return (
    <globalContext.Provider value={value}>
      <FileManager />
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
