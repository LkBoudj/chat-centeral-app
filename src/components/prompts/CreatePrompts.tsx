import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInputTags from "../global/CustomInputTags";
import { Technology } from "@prisma/client";
import { ACCEPTED_IMAGE_MIME_TYPES } from "@/lib/configs/validition_config";
import FormModal from "../global/form/FormModal";
import { FormInput } from "../global/form";
import { createPromptValidation } from "@/lib/validation/prompts_validation";
import { trpc } from "@/trpc/client";

type Props = {
  isOpen: boolean;
  techs: Technology[];
  tags?: string[];
  onOpenChange: (kay: any) => void;
  onClose: () => void;
};

type Inputs = z.infer<typeof createPromptValidation>;

const CreatePrompts = ({ isOpen, onOpenChange, techs, onClose }: Props) => {
  const [customErrors, setCustomErros] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [tagsData, seTtags] = useState<any>([]);

  const getAllTags = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/tags`, {
      method: "GET",
    });

    if (res.ok) {
      const json = await res.json();

      const myTags = json.data.map((tag: any) => tag.name);
      seTtags(myTags);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      getAllTags();
    }
  }, [isLoading]);
  const [imageSrc, setImageSrc] = useState<any>("");

  const {
    data: d,
    mutate,
    isPending,
    isSuccess,
    isError,
  } = trpc.promptsAppRouter.create.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(createPromptValidation),
    defaultValues: { tags: [], technology: "all" },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    mutate({ ...data });
    reset();
    onClose();
  };

  return (
    <FormModal
      classContent="pb-8"
      isOpen={isOpen}
      edit={true}
      title={"Create New Prompt "}
      typeForm={"Create"}
      handleSubmit={handleSubmit(onSubmit)}
      onOpenChange={onOpenChange}
    >
      {/* <FileUploadImage
        className="flex justify-center w-full "
        imageSrc={imageSrc}
        register={register}
        name="image"
        isErroro={errors.image?.message != undefined || isHasBackError("image")}
        handelFile={(e) => handalImage(e, setImageSrc)}
      /> */}
      <div className="space-y-4 mt-4 ">
        <FormInput.FromInputController
          control={control}
          customErrors={customErrors}
          id="title"
          label="title"
        />
        <FormInput.FormTextareaController
          control={control}
          customErrors={customErrors}
          id="excerpt"
          label="Excerpt"
        />

        <FormInput.FormTextareaController
          control={control}
          customErrors={customErrors}
          id="content"
          label="content"
        />

        <FormInput.FormComboxDataController
          control={control}
          data={techs}
          customErrors={customErrors}
          id="content"
          label="content"
        />

        <Controller
          name="tags"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <CustomInputTags
                data={tagsData}
                onChange={onChange}
                value={value}
              />
            </>
          )}
        />
      </div>
    </FormModal>
  );
};

export default CreatePrompts;
