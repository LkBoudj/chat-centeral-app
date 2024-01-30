"use client";
import { ContainerMaxWind, Message } from "..";

import { ScrollShadow } from "@nextui-org/react";
import InitailtMessage from "./InitialMessage";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
const ListOfMessages = ({ messages }: { messages?: any[] }) => {
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const contianerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: firstMessageRef.current,
    threshold: 1,
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("loooood mor");
    }
  }, [entry]);

  useEffect(() => {
    // if (contianerRef.current) {
    //   contianerRef.current.scrollTop = contianerRef.current.scrollHeight;
    // }
    if (contianerRef.current) {
      contianerRef.current.scrollTop = 1444;
    }
  }, [messages, contianerRef]);
  return (
    <ScrollShadow
      isEnabled={false}
      ref={contianerRef}
      className="w-full  lg:pr-[370px]  h-screen chat-area scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <ContainerMaxWind className="w-full max-w-7xl mx-auto flex flex-col pt-4 space-y-4 px-5">
        {messages?.length ? (
          messages?.map((message: any, index: number) =>
            index == 0 ? (
              <Message
                ref={ref}
                technology={message.technology}
                key={index}
                id={message?.id}
                content={message?.content + "_" + index}
                fromMachin={message?.fromMachin ?? false}
                media={message?.media}
              />
            ) : index == messages?.length - 1 ? (
              <Message
                technology={message.technology}
                key={index}
                id={message?.id}
                content={message?.content + "last one"}
                fromMachin={message?.fromMachin ?? false}
                media={message?.media}
              />
            ) : (
              <Message
                ref={lastMessageRef}
                technology={message.technology}
                key={index}
                id={message?.id}
                content={message?.content}
                fromMachin={message?.fromMachin ?? false}
                media={message?.media}
              />
            )
          )
        ) : (
          <InitailtMessage />
        )}
      </ContainerMaxWind>
    </ScrollShadow>
  );
};

export default ListOfMessages;
