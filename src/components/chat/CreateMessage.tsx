"use client";
import { z } from "zod";
import Form from "../global/form/Form";
import { Image, Link, Textarea, cn } from "@nextui-org/react";
import { Mic, SendHorizontal, Paperclip, XIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ContainerMaxWind,
  CustmMediaMediaComponent,
  IconButton,
  TehcnologoySelect,
} from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";

import { chatContext } from "../context/ChatContextProvider";
import { createNewMessageFrontV } from "@/lib/validation/messages";
import { isArabicChar } from "@/lib/utlis";
import { useSession } from "next-auth/react";

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
    setFile,
    onOpenUploadFile,
    selectdTechnology,
    file,
    sessionUser,
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
    } else if (watch("content")?.length == 0) {
      setTextArabicDirection(false);
    }
  }, [watch]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const message = {
      ...data,
      media: file,
      technologyId: selectdTechnology?.id,
      model: selectdModel,
    };

    hanldeSendMessage && hanldeSendMessage(JSON.stringify(message));
    setFile(null);
    reset();
  };

  return (
    <div className="absolute bottom-[12px] z-50 w-full left-0 px-4 lg:pr-[370px]">
      <ContainerMaxWind className=" max-w-7xl mx-auto space-y-8">
        {file && (
          <div className="w-full flex space-x-2 ">
            <div className="relative ">
              <CustmMediaMediaComponent.MediaType
                className="relative z-40"
                width={150}
                heigth={150}
                media={file}
              />
              <IconButton
                onClick={() => setFile(null)}
                className="absolute bg-white top-0 right-0 z-[999999]"
                Icon={XIcon}
              />
            </div>
          </div>
        )}

        {sessionUser && sessionUser?.msgCounter < sessionUser?.messagesMax ? (
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
                  placeholder={
                    [
                      "What's on your mind?",
                      "Got questions? Fire away!",
                      "Curious about something? Ask away!",
                      "How can I assist you today?",
                      "Let's dive into your queries!",
                      "Shoot your questions, I'm all ears!",
                      "Feeling inquisitive? I'm here to help!",
                      "Any burning questions today?",
                      "What intriguing question do you have today?",
                      "Ready to explore? Ask me something!"
                    ][Math.floor(Math.random() * 10)]
                  }
                  variant="bordered"
                  color="default"
                  dir={textArabicDirection ? "rtl" : "ltr"}
                  onKeyDown={(e) => {
                    if (e.key == "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}
                  classNames={{
                    inputWrapper: "border-none shadow-none",
                    input: textArabicDirection && `text-right`,
                  }}
                  className={cn(
                    `placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full`
                  )}
                />

              </div>

              <IconButton size={22} Icon={Mic} />
            </div>
            <div className="flex items-end justify-between">
              <IconButton
                onPress={onOpenUploadFile}
                size={22}
                Icon={Paperclip}
              />
              <IconButton
                isLoading={isAiThink}
                isDisabled={
                  watch("content")?.length <= 0 || !isAiThinkCompleted
                }
                type="submit"
                size={22}
                Icon={SendHorizontal}
              />
            </div>
          </Form>
        ) : (
          <p className="w-full bg-white/50 p-5 text-center">
            Looks like you&apos;re out of message credits! 🌟 Don&apos;t miss out on the fun -
            <Link href="/subscription"> top up your account </Link> and keep the conversation going!
          </p>

        )}
      </ContainerMaxWind>
    </div>
  );
};

export default CreateMessage;
