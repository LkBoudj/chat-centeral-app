import { dashUserContext } from "@/components/context/dashboard/DashUserContextProvider";
import { globalContext } from "@/components/context/GlobalContextProvider";
import {
  schemaCreateUser,
  schemaCreateUserInputs,
} from "@/lib/validation/user_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

export const useCreateUpdate = () => {
  const { onOpenChange, isOpen, setCustomErros, customErrors, createItem } =
    useContext(dashUserContext);
  const { onOpenUploadFile, files, setFiles } = useContext(globalContext);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<schemaCreateUserInputs>({
    resolver: zodResolver(schemaCreateUser),
    defaultValues: {
      status: true,
      roles: "admin",
    },
  });

  useEffect(() => {
    if (Array.isArray(files) && files.length && files[0]?.src) {
      setValue("image", files[0]?.src);
    }
  }, [files, setValue]);

  const onSubmit: SubmitHandler<schemaCreateUserInputs> = async (data) => {
    createItem(JSON.stringify(data));
    setFiles(null);
    reset();
  };

  const handleOnSubmitUser = handleSubmit(onSubmit);
  return {
    files,
    onOpenUploadFile,
    isOpen,
    onOpenChange,
    handleOnSubmitUser,
    control,
    customErrors,
  };
};

export default useCreateUpdate;
