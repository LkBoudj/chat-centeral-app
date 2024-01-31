"use client";
import { ContainerMaxWind, Message } from "..";

import { Image, ScrollShadow } from "@nextui-org/react";
import InitailtMessage from "./InitialMessage";
import { createRef, useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
const ListOfMessages = ({ messages }: { messages?: any[] }) => {
  const firstMessageRef: any = createRef();
  const lastMessageRef: any = createRef();
  const scrollListMessages: any = createRef();
  const { ref, entry } = useIntersection({
    root: firstMessageRef.current,
    threshold: 1,
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
    }
  }, [entry]);

  // useEffect(() => {
  //   if (messages && scrollListMessages.current && lastMessageRef.current) {
  //     scrollListMessages.current.scrollTo({
  //       top: lastMessageRef.current.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [lastMessageRef]);

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
          media={message?.media}
        />
      );
    else if (index == messages?.length - 1)
      return (
        <Message
          ref={lastMessageRef}
          technology={message.technology}
          key={message?.id}
          id={message?.id}
          content={message?.content}
          fromMachin={message?.fromMachin ?? false}
          media={message?.media}
        />
      );

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
      className="w-full  lg:pr-[370px]  h-screen chat-area scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <ContainerMaxWind className="w-full max-w-7xl mx-auto flex flex-col pt-4 space-y-4 px-5 pb-96">
        {messages?.length ? mapForMessages : <InitailtMessage />}
      </ContainerMaxWind>
    </ScrollShadow>
  );
};

export default ListOfMessages;
