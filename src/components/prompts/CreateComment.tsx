"use client";
import React from "react";
import { Form, FormInput } from "../global/form";
import { cn } from "@nextui-org/react";
import { useComment } from "@/lib/hocks/prompts/useComment";
import IconButton from "../global/IconButton";
import { SendHorizontal } from "lucide-react";

type CreateCommentProps = {
  promptId: number;
};

const CreateComment = ({ promptId }: CreateCommentProps) => {
  const { handleOnSubmitComment, control, errors } = useComment({
    promptId,
  });

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-2xl">Comments</h3>
      <Form
        className="w-full py-3  pr-4 border  rounded-lg space-y-4 flex items-center "
        handleSubmit={handleOnSubmitComment}
      >
        <FormInput.FormTextareaController
          id="content"
          control={control}
          placeholder="What you think?"
          classNames={{
            inputWrapper: "border-none shadow-none  w-full",
          }}
          className={cn(
            `placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full`
          )}
          customErrors={errors}
        />
        <div className="flex justify-end ">
          <IconButton Icon={SendHorizontal} type="submit" />
        </div>
      </Form>
    </div>
  );
};

export default CreateComment;
