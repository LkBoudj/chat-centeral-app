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
import useCreateTech from "@/lib/hocks/technology/useCreateUpdateTech";

const CreateTechnology = () => {
  const {
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
  } = useCreateTech();

  return (
    <FormModel
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={"Create New Technology"}
      typeForm={"create"}
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

      <Button className="w-full" color="primary" type="submit">
        create
      </Button>
    </FormModel>
  );
};

export default CreateTechnology;
