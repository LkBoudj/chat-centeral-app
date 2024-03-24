import { techContext } from "@/components/context/dashboard/TechnologyContextProvider";
import { globalContext } from "@/components/context/GlobalContextProvider";
import {
  schemCreateTechFront,
  schemCreateTechFrontInputs,
  schemEditTechBack,
  schemEditTechBackInputs,
} from "@/lib/validation/technology_validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

export const useCreateTech = () => {
  const { onOpenChange, isOpen, setCustomErros, customErrors, createItem } =
    useContext(techContext);

  const { onOpenUploadFile, files } = useContext(globalContext);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<schemCreateTechFrontInputs>({
    resolver: zodResolver(schemCreateTechFront),
    defaultValues: {
      status: true,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      //@ts-ignore
      name: "models", // unique name for your Field Array
    }
  );
  const onSubmit: SubmitHandler<schemCreateTechFrontInputs> = async (data) => {
    const result = await createItem(JSON.stringify(data));
    result && reset();
  };

  const handleSubmitTech = handleSubmit(onSubmit);
  useEffect(() => {
    if (files[0]?.src) {
      setValue("logo", files[0]?.src);
    }
  }, [files, setValue]);
  useEffect(() => {
    if (Object.keys(errors).length) {
      setCustomErros(errors);
    }
  }, [errors, setCustomErros]);

  return {
    handleSubmitTech,
    register,
    isOpen,
    onOpenChange,
    files,
    onOpenUploadFile,
    control,
    customErrors,
    fields,
    remove,
    append,
  };
};

export const useUpdateTech = () => {
  const {
    onOpenChangeU,
    isOpenU,
    setCustomErros,
    customErrors,
    updateItem,
    selectedItem,
  }: any = useContext(techContext);

  const { onOpenUploadFile, files, setFiles } = useContext(globalContext);
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<schemEditTechBackInputs>({
    resolver: zodResolver(schemEditTechBack),
    defaultValues: {
      id: selectedItem?.id,
      name: selectedItem?.name,
      refTech: selectedItem?.refTech,
      status: selectedItem?.status,
      models: selectedItem?.models?.split("#") ?? [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      //@ts-ignore
      name: "models", // unique name for your Field Array
    }
  );

  useEffect(() => {
    if (files[0]?.src) {
      setValue("logo", files[0]?.src);
    }
  }, [files, setValue]);
  useEffect(() => {
    if (Object.keys(errors).length) {
      setCustomErros(errors);
    }
  }, [errors, setCustomErros]);

  const onSubmit: SubmitHandler<schemEditTechBackInputs> = async (data) => {
    await updateItem(JSON.stringify(data));
  };

  const handleSubmitTech = handleSubmit(onSubmit);

  return {
    onOpenChangeU,
    isOpenU,
    setCustomErros,
    customErrors,
    updateItem,
    selectedItem,
    handleSubmitTech,
    register,
    files,
    onOpenUploadFile,
    control,
    fields,
    remove,
    append,
  };
};
export default useCreateTech;
