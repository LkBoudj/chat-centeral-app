"use client";
import {
  FormInput,
  FormModel,
  FormSwitchInput,
} from "@/components/global/form";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

import { IconButton } from "@/components";
import { Minus, PlusIcon } from "lucide-react";

import { useContext, useEffect } from "react";
import { techContext } from "@/components/context/dashboard/TechnologyContextProvider";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { schemCreateTechFront } from "@/lib/validation/technology_validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { globalContext } from "@/components/context/GolobalContextProvider";

type Inputs = z.infer<typeof schemCreateTechFront>;
const CreateTechnology = () => {
  const { onOpenChange, isOpen, setCustomErros, customErrors, createItem } =
    useContext(techContext);
  const { onOpenUploadFile, file, setFile } = useContext(globalContext);
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schemCreateTechFront),
    defaultValues: {
      status: true,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "models", // unique name for your Field Array
    }
  );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await createItem(JSON.stringify(data));
    result && reset();
  };
  useEffect(() => {
    if (file?.src) {
      setValue("logo", file?.src);
    }
  }, [file]);
  useEffect(() => {
    if (Object.keys(errors).length) {
      setCustomErros(errors);
    }
  }, [errors, setCustomErros]);
  return (
    <FormModel
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={"Create New Technology"}
      typeForm={"create"}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-center mb-4">
        <Avatar size="lg" src={file?.src} onClick={onOpenUploadFile} />
      </div>

      <FormInput.FromInputController
        control={control}
        customErrors={customErrors}
        id="name"
        label="Name"
      />
      <FormInput.FromInputController
        control={control}
        id="refTech"
        label="Ref"
      />

      <div>
        <FormSwitchInput control={control} label="Status" name="status" />
      </div>
      <Card>
        <CardHeader>
          <span className="text-sm text-slate-500">Models</span>
        </CardHeader>
        <CardBody className="space-y-4">
          {fields.map((field, index) => (
            <div className="flex items-center gap-2" key={index}>
              <FormInput.FromInputController
                control={control}
                id={`models[${index}]`}
                placeholder="Name"
              />

              <IconButton
                className="text-red-700 bg-red-100 hover:bg-red-500"
                Icon={Minus}
                onClick={() => {
                  remove(index);
                }}
                size={20}
              />
            </div>
          ))}
        </CardBody>
        <CardFooter>
          <Button
            //@ts-ignore
            onClick={() => append("")}
            size="sm"
            variant="light"
            color="primary"
          >
            <PlusIcon size={20} />
            <span>Add More</span>
          </Button>
        </CardFooter>
      </Card>

      <Button className="w-full" color="primary" type="submit">
        create
      </Button>
    </FormModel>
  );
};

export default CreateTechnology;
