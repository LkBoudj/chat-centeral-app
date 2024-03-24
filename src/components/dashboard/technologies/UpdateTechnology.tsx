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
  Image,
} from "@nextui-org/react";

import { IconButton } from "@/components";
import { Minus, PlusIcon } from "lucide-react";

import { useTechnologyHoeck } from "@/lib/hocks";
import { useContext, useEffect } from "react";
import { techContext } from "@/components/context/dashboard/TechnologyContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { schemEditTechBack } from "@/lib/validation/technology_validation";
import { date, z } from "zod";
import { globalContext } from "@/components/context/GlobalContextProvider";
import { useUpdateTech } from "@/lib/hocks/technology/useCreateUpdateTech";

const UpdateTechnology = () => {
  const {
    onOpenChangeU,
    isOpenU,
    setCustomErros,
    customErrors,
    updateItem,
    selectedItem,
    files,
    handleSubmitTech,
    onOpenUploadFile,
    control,
    fields,
    remove,
    append,
  } = useUpdateTech();

  return (
    <FormModel
      isOpen={isOpenU}
      onOpenChange={onOpenChangeU}
      title={"Update Technology"}
      typeForm={"update"}
      edit={true}
      handleSubmit={handleSubmitTech}
    >
      <div className="flex items-center justify-center mb-4">
        <Avatar size="lg" src={files[0]?.src} onClick={onOpenUploadFile} />
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
    </FormModel>
  );
};

export default UpdateTechnology;
