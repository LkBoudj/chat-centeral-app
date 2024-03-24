"use client";
import { ContainerMaxWind, Error, IconButton, Loading } from "@/components";
import {
  User,
  Image,
  Divider,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import React from "react";
import moment from "moment";
import ActionPromptShow from "@/components/prompts/ActionPromptShow";
import useSinglePrompt from "@/lib/hocks/prompts/useSinglePrompt";
import { MessageCircle, ThumbsUp } from "lucide-react";
import CreateComment from "@/components/prompts/CreateComment";
import DisplayAllComments from "@/components/prompts/DisplayAllComments";

const PromptPage = () => {
  const { prompt, isLoading, isError } = useSinglePrompt();

  if (isLoading) {
    return <Loading />;
  } else if (isError || prompt?.id == null) {
    return <Error />;
  }
  return (
    <ContainerMaxWind className="px-4 max-w-7xl space-y-8 pt-8 pb-16">
      <div className="space-y-6 text-center max-w-[890px] mx-auto">
        <h1 className="text-lg md:text-[42px] font-bold leading-relaxed">
          {prompt?.title}
        </h1>
        <p className="text-md font-medium text-slate-400">{prompt?.excerpt}</p>
      </div>

      <div className="flex justify-center">
        <Image
          className="w-full max-w-md md:max-w-2xl h-auto"
          src={prompt?.image ?? ""}
          alt={prompt?.excerpt ?? ""}
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <User
          name={prompt?.user.name}
          avatarProps={{
            src: prompt?.user.image ?? "/images/default.jpeg",
          }}
        />
        <div className="flex items-center gap-4">
          <IconButton content={"50"} Icon={ThumbsUp} />
          <IconButton
            Icon={MessageCircle}
            content={"100"}
            // onClick={handelComment}
          />
        </div>
      </div>
      <Divider />
      <div className="flex gap-4 items-center flex-wrap justify-center">
        {prompt.tags?.length &&
          prompt.tags?.split(",").map((t: string) => (
            <Button key={t} size="sm" color="default" variant="bordered">
              {t}
            </Button>
          ))}
      </div>
      <div>
        <p className=" leading-loose text-md font-medium text-center">
          {prompt?.content}
        </p>
      </div>

      <CreateComment promptId={prompt.id} />
      <DisplayAllComments promptId={prompt.id} />
    </ContainerMaxWind>
  );
};

export default PromptPage;
