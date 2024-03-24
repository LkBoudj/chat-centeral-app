import { Autocomplete, Avatar, Input, Textarea } from "@nextui-org/react";
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
import { promptContext } from "../context/PromptContextProvider";
import CustomButtonUploadFiles from "../global/Avatar";
import { globalContext } from "../context/GlobalContextProvider";

type Props = {
  isOpen: boolean;
  techs: Technology[];
  tags?: string[];
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  setItems: (items: any) => void;
};

type Inputs = z.infer<typeof createPromptValidation>;

const EditPrompts: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  techs,
  onClose,
  setItems,
}) => {
  const { sessionUser, selectedPrompt } = useContext(promptContext);
  const { onOpenUploadFile, files, setFiles } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tagsData, setTagsData] = useState<string[]>([]);

  useEffect(() => {
    if (isLoading) {
      getAllTags();
    }
  }, [isLoading]);

  const getAllTags = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tags`);
      if (res.ok) {
        const json = await res.json();
        const myTags = json.data.map((tag: any) => tag.name);
        setTagsData(myTags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { mutate } = trpc.promptsAppRouter.update.useMutation({
    async onMutate(opts: any) {
      opts.user = sessionUser;

      setItems((prevItems: any[]) => {
        return prevItems.map((item: any) => {
          if (item.id == opts.id) {
            return opts;
          } else {
            return item;
          }
        });
      });
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(createPromptValidation),
    defaultValues: {
      ...selectedPrompt,
      technology: selectedPrompt.technologyId
        ? selectedPrompt.technologyId.toString()
        : "all",
      tags: selectedPrompt?.tags ? selectedPrompt?.tags.split(",") : [],
    },
  });

  const onSelectionChange = (val: string) => setValue("technology", val);
  useEffect(() => {
    setFiles([]);
  }, [setFiles]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.image = files[0]?.src || null;

    const { tags, ...restDta }: any = data;
    if (tags && tags?.length) {
      restDta.tags = tags.join(",");
    }

    mutate({ id: selectedPrompt.id, ...restDta });
    reset();
    setFiles([]);
    onClose();
  };

  return (
    <FormModal
      classContent="pb-8"
      isOpen={isOpen}
      edit={true}
      title={"Create New Prompt"}
      typeForm={"Create"}
      handleSubmit={handleSubmit(onSubmit)}
      onOpenChange={onOpenChange}
    >
      <CustomButtonUploadFiles
        fileSrc={files.length ? files[0].src : selectedPrompt?.image ?? ""}
        onOpenUploadFile={onOpenUploadFile}
      />
      <div className="space-y-4 mt-4">
        <FormInput.FromInputController
          control={control}
          id="title"
          label="Title"
        />
        <FormInput.FormTextareaController
          control={control}
          id="excerpt"
          label="Excerpt"
        />
        <FormInput.FormTextareaController
          control={control}
          id="content"
          label="Content"
        />
        <FormInput.FormComboxDataController
          control={control}
          data={techs}
          id="technology"
          label="Technology"
          onSelectionChange={onSelectionChange}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomInputTags
              data={tagsData}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
    </FormModal>
  );
};

export default EditPrompts;
