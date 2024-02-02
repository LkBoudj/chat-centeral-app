"use client";
import { z } from "zod";
import Form from "../global/form/Form";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Textarea,
  User,
  cn,
} from "@nextui-org/react";
import { Mic, SendHorizontal, Paperclip } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContainerMaxWind, IconButton, TehcnologoySelect } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";

import { chatContext } from "../context/ChatContextProvider";
import { createNewMessageFrontV } from "@/lib/validation/messages";
import { isArabicChar } from "@/lib/utlis";

type Props = {
  hanldeSendMessage?: (key?: any) => void;
  isAiThink?: boolean;
  isAiThinkCompleted?: boolean;
};

type Inputs = z.infer<typeof createNewMessageFrontV>;

const CreateMessage = ({
  hanldeSendMessage,
  isAiThink,
  isAiThinkCompleted,
}: Props) => {
  const [textArabicDirection, setTextArabicDirection] = useState(false);
  const params = useParams();
  const {
    selectdModel,

    onOpenUploadFile,
    selectdTechnology,
    file,
  } = useContext(chatContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    resolver: zodResolver(createNewMessageFrontV),
    defaultValues: {
      conversationId: params.id as string,
    },
  });
  useEffect(() => {
    if (errors.conversationId?.message || errors.content?.message) {
      toast.error("your message not sened");
    }
  }, [errors, isDirty]);
  useEffect(() => {
    if (watch("content")?.length == 1) {
      const isArabic = isArabicChar(watch("content"));
      setTextArabicDirection(isArabic);
      console.log(isArabic);
    }
  }, [watch("content")]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    hanldeSendMessage &&
      hanldeSendMessage(
        JSON.stringify({
          ...data,
          fileId: file?.id ?? null,
          technologyId: selectdTechnology?.id,
          model: selectdModel,
        })
      );
    reset();
  };

  return (
    <div className="absolute bottom-[12px] w-full left-0 px-4 lg:pr-[370px]">
      <ContainerMaxWind className=" max-w-7xl mx-auto ">
        <Form
          handleSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl ring-1 p-5 "
        >
          <div className="flex items-start">
            <div className="flex items-center w-full">
              <TehcnologoySelect />

              <Textarea
                {...register("content")}
                minRows={1}
                placeholder="Ask me any think"
                variant="bordered"
                color="default"
                onKeyDown={(e) => {
                  if (e.key == "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
                classNames={{
                  inputWrapper: "border-none shadow-none ",
                  input: textArabicDirection && `text-right`,
                }}
                className={cn(
                  `placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full `
                )}
              />
            </div>

            <IconButton size={22} Icon={Mic} />
          </div>
          <div className="flex items-end justify-between">
            <IconButton onPress={onOpenUploadFile} size={22} Icon={Paperclip} />
            <IconButton
              isLoading={isAiThink}
              isDisabled={watch("content")?.length <= 0 || !isAiThinkCompleted}
              type="submit"
              size={22}
              Icon={SendHorizontal}
            />
          </div>
        </Form>
      </ContainerMaxWind>
    </div>
  );
};

export default CreateMessage;
