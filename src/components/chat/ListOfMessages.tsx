"use client";
import { ContainerMaxWind, Message } from "..";

import { ScrollShadow } from "@nextui-org/react";
import InitailtMessage from "./InitialMessage";
import { createRef, useRef } from "react";
import { useIntersection } from "@mantine/hooks";

const ListOfMessages = ({
  messages,
  handelNextPageM,
  isHaveNextM,
}: {
  messages?: any[];
  handelNextPageM?: () => void;
  isHaveNextM?: boolean;
}) => {
  const firstMessageRef: any = createRef();
  const scrollListMessages: any = createRef();
  const { ref, entry } = useIntersection({
    root: firstMessageRef.current,
    threshold: 1,
  });

  const scrollToBottom = () => {
    if (scrollListMessages.current) {
      scrollListMessages.current?.scrollTo({
        top: document.body.clientHeight + 100,
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  // useEffect(() => {
  //   if (entry?.isIntersecting) {

  //   }
  // }, [entry, isHaveNextM]);

  const mapForMessages = messages?.map((message: any, index: number) => {
    if (index == 0)
      return (
        <Message
          ref={ref}
          technology={message.technology}
          key={message?.id}
          id={message?.id}
          content={message?.content}
          fromMachin={message?.fromMachin ?? false}
          media={message?.media ?? []}
        />
      );
    else
      return (
        <Message
          technology={message.technology}
          key={message?.id}
          id={message?.id}
          content={message?.content}
          fromMachin={message?.fromMachin ?? false}
          media={message?.media}
        />
      );
  });
  return (
    <ScrollShadow
      isEnabled={false}
      ref={scrollListMessages}
      className="w-full  lg:pr-[370px]  h-screen mt-8 chat-area pb-16 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <ContainerMaxWind className="w-full max-w-7xl mx-auto flex flex-col  space-y-4 px-5 ">
        {messages?.length ? mapForMessages : <InitailtMessage />}
      </ContainerMaxWind>
    </ScrollShadow>
  );
};

export default ListOfMessages;
