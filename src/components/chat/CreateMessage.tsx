"use client";

import Form from "../global/form/Form";
import { Link, Textarea, cn } from "@nextui-org/react";
import { Mic, SendHorizontal, Paperclip, XIcon, X } from "lucide-react";

import { ContainerMaxWind, IconButton, TechnologySelect } from "..";

import { Media } from "@prisma/client";
import MediaItem from "../global/explorer/MediaItem";
import { useSubmitMessage } from "@/lib/hocks/message/useMessages";

const DisplayFiles = () => {
  const { files, handelRemoveSelectedFile } = useSubmitMessage();
  return (
    <div className="  w-full grid grid-cols-4 ">
      {files.map((media: Media) => (
        <div className="relative " key={media.id}>
          <IconButton
            className="absolute -top-4 -right-3 bg-slate-50 p-0"
            color="danger"
            size={15}
            onPress={() => handelRemoveSelectedFile(media.id)}
            Icon={X}
          />
          <MediaItem src={media.src} type={media.type} />
        </div>
      ))}
    </div>
  );
};

const SendMessageForm: React.FC<any> = () => {
  const {
    onOpenUploadFile,
    files,
    register,
    watch,
    customHandleSubmit,
    isAiThink,
  } = useSubmitMessage();
  return (
    <Form
      handleSubmit={customHandleSubmit}
      className="bg-white rounded-xl ring-1 px-5 py-3 "
    >
      <div className="flex items-end">
        <div className="mb-2">
          <TechnologySelect maxCharacter={4} />
        </div>
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
              "Ready to explore? Ask me something!",
            ][Math.floor(Math.random() * 100)]
          }
          variant="bordered"
          color="default"
          // dir={textArabicDirection ? "rtl" : "ltr"}
          onKeyDown={(e) => {
            if (e.key == "Enter" && !e.shiftKey) {
              e.preventDefault();
              customHandleSubmit();
            }
          }}
          classNames={{
            inputWrapper: "border-none shadow-none",
            //input: textArabicDirection && `text-right`,
          }}
          className={cn(
            `placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full`
          )}
        />

        <IconButton onPress={onOpenUploadFile} size={22} Icon={Paperclip} />
        <IconButton
          isLoading={isAiThink}
          isDisabled={watch("content")?.length <= 0 || isAiThink}
          type="submit"
          size={22}
          Icon={SendHorizontal}
        />
      </div>
    </Form>
  );
};

const SubscriptionAlert = () => {
  return (
    <p className="w-full bg-white/50 p-5 text-center">
      Looks like you&apos;re out of message credits! 🌟 Don&apos;t miss out on
      the fun -<Link href="/subscription"> top up your account </Link> and keep
      the conversation going!
    </p>
  );
};
const CreateMessage = () => {
  const { files, sessionUser } = useSubmitMessage();

  return (
    <div className=" bottom-[0px] z-50 w-full left-0 px-4 lg:pr-[370px]">
      <ContainerMaxWind className=" max-w-7xl mx-auto space-y-8">
        {files.length ? <DisplayFiles /> : ""}

        {sessionUser ? (
          sessionUser.remaining > 0 ? (
            <SendMessageForm />
          ) : (
            <SubscriptionAlert />
          )
        ) : (
          ""
        )}
      </ContainerMaxWind>
    </div>
  );
};

export default CreateMessage;
