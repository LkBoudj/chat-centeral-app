import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { globalContext } from "./GolobalContextProvider";
import { Media } from "@prisma/client";
import UploadExplorer from "../global/explorer/UploadExplorer";
import toast from "react-hot-toast";
import { hanldeCustomErrorsZod } from "@/lib/utlis";

type Props = {
  children: React.ReactNode;
  defaultVal?: any;
};

export const userContext = createContext<any>(null);

const UserContextProvider = ({ children, defaultVal }: Props) => {
  const { data: session } = useSession();
  const [customErrors, setCustomErros] = useState<any>();
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsErrors] = useState<boolean>(false);
  const user = session?.user;

  const { isUploadFileOpen, onClose } = useContext(globalContext);

  const handelSelectFile = async (e: Media) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ image: e.src }),
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

  const handelUpdateUser = async (obj: any) => {
    const res = await fetch(`/api/users/${userData?.id}`, {
      method: "POST",
      body: JSON.stringify(obj),
    });
    const { error, data, success } = await res.json();
    if (res.ok && success) {
      if (data && setUserData) setUserData(data);
      toast.success("the profile updated successfuly");
    } else {
      if (error) {
        hanldeCustomErrorsZod(error, setCustomErros);
      }
      toast.error("there is a problem");
    }
  };

  const getUserData = async (id: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/users/${id}`);
    if (res.ok) {
      const { success, data } = await res.json();
      if (success) {
        setUserData(data);
        setIsErrors(false);
      }
    } else {
      setIsErrors(true);
    }
    setIsLoading(false);
  };

  const values = {
    ...defaultVal,
    isError,
    user,
    userData,
    isLoading,
    setUserData,
    setIsLoading,
    setIsErrors,
    handelUpdateUser,
    customErrors,
    setCustomErros,
    getUserData,
  };

  useEffect(() => {
    if (user?.id) getUserData(user?.id);
  }, [user?.id, setUserData]);

  useEffect(() => {}, [defaultVal]);
  return (
    <userContext.Provider value={values}>
      {isUploadFileOpen && (
        <UploadExplorer types={["image"]} handelSelectFile={handelSelectFile} />
      )}
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
