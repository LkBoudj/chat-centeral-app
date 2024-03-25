"use client";
import { useDisclosure } from "@nextui-org/react";
import { Media, User } from "@prisma/client";
import React, { createContext, useState } from "react";
import FileManager from "../global/explorer/FileManager";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

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
  const [files, setFiles] = useState<Media[]>([]);
  const [progress, setProgress] = useState(0);
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<User>();
  const sessionUser = session?.user;
  const {
    isOpen: isUploadFileOpen,
    onOpen: onOpenUploadFile,
    onOpenChange: onOpenChangeUploadFile,
    onClose,
  } = useDisclosure();

  const handelSelectFile = async () => {
    const res = await fetch(`/api/users/${sessionUser.id}`, {
      method: "PUT",
      body: JSON.stringify({ image: files[0].src }),
    });

    const { data, success, error } = await res.json();
    if (res.ok && success) {
      console.log(data);

      if (data && setUserData) setUserData(data);
      toast.success("the profile updated successfuly");
    } else {
      toast.error("there is a problem");
    }
    onClose();
  };
  const value = {
    isUploadFileOpen,
    onOpenUploadFile,
    onOpenChangeUploadFile,
    progress,
    setProgress,
    onClose,
    files,
    setFiles,
    sessionUser,
    userData,
    setUserData,
  };
  return (
    <globalContext.Provider value={value}>
      <FileManager />
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
