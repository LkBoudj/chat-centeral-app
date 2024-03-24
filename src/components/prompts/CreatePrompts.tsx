import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Input,
  Textarea,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInputTags from "../global/CustomInputTags";
import { Technology } from "@prisma/client";

import FormModal from "../global/form/FormModal";
import { FormInput } from "../global/form";
import { createPromptValidation } from "@/lib/validation/prompts_validation";
import { trpc } from "@/trpc/client";
import { promptContext as promptContext } from "../context/PromptContextProvider";
import CustomButtonUploadFiles from "../global/Avatar";
import { globalContext } from "../context/GlobalContextProvider";

type Props = {
  isOpen: boolean;
  techs: Technology[];
  onOpenChange: (kay: any) => void;
  onClose: () => void;
  setItems: (key?: any) => void;
};

type Inputs = z.infer<typeof createPromptValidation>;

const CreatePrompts: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  techs,
  onClose,
  setItems,
}) => {
  const { onOpenUploadFile, files, setFiles, sessionUser } =
    useContext(globalContext);
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

  useEffect(() => {
    setFiles([]);
  }, [setFiles]);

  const { data: d, mutate } = trpc.promptsAppRouter.create.useMutation({
    async onMutate(opts: any) {
      opts.user = sessionUser;
      setItems((items: any[]) => [...items, opts]);
    },
    async onSuccess(data: any) {
      console.log("success", data);
    },

    onError(error) {
      console.log("error", error);
    },
  });

  const { handleSubmit, control, reset, setValue } = useForm<Inputs>({
    resolver: zodResolver(createPromptValidation),
    defaultValues: { tags: [], technology: "all" },
  });

  const onSelectionChange = (val: string) => setValue("technology", val);
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const { tags, ...restDta } = data;
    if (tags?.length) {
      restDta.tags = tags.join(",");
    }

    mutate({ ...restDta, image: files[0]?.src || null });
    reset();
    setFiles([]);
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
      <div className="flex items-center justify-center mb-4">
        <CustomButtonUploadFiles
          fileSrc={files[0]?.src ?? ""}
          onOpenUploadFile={onOpenUploadFile}
        />
      </div>
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
          id="technologyId"
          label="Technology"
          onSelectionChange={onSelectionChange}
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
