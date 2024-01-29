"use client";
import { z } from "zod";
import Form from "../global/Form";
import { Textarea } from "@nextui-org/react";
import { Mic, SendHorizontal, Paperclip } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContainerMaxWind, IconButton } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";

import { chatContext } from "../context/ChatContextProvider";
import { createNewMessageFrontV } from "@/lib/validation/messages";

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
  const params = useParams();
  const {
    selectdTechnologyId,
    selectdModel,
    isUploadFileOpen,
    onOpenUploadFile,
    onOpenChangeUloadFile,
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({
      ...data,
      technologyId: Number(selectdTechnologyId),
      model: selectdModel,
    });

    hanldeSendMessage &&
      hanldeSendMessage(
        JSON.stringify({
          ...data,
          technologyId: Number(selectdTechnologyId),
          model: selectdModel,
        })
      );
    reset();
  };
  useEffect(() => {
    if (errors.conversationId?.message || errors.content?.message) {
      toast.error("your message not sened");
    }
  }, [errors, isDirty]);
  return (
    <div className="absolute bottom-[12px] w-full left-0 px-4 lg:pr-[370px]">
      <ContainerMaxWind className=" max-w-7xl mx-auto ">
        <Form
          handleSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl ring-1 p-5 "
        >
          <div className="flex items-start">
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
              }}
              className=" placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full "
            />

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
