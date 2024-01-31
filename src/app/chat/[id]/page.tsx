"use client";
import { ChatAside, CreateMessage, LkNavbar, Message } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import { Spinner } from "@nextui-org/react";
import ListOfMessages from "@/components/chat/ListOfMessages";
import { useContext, useEffect, useState } from "react";
import { chatContext } from "@/components/context/ChatContextProvider";
import { trpc } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { limit_infinite_messagess } from "@/lib/configs/infinte_scrolle_config";

type Props = {
  params: { id: string };
};

const ConversationPage = ({ params }: Props) => {
  const [aiMessage, setAiMessage] = useState("");
  const { selectdTechnology } = useContext(chatContext);
  const utils = trpc.useUtils();
  const { data, isLoading, isSuccess } =
    trpc.messages.infiniteConversationMessages.useInfiniteQuery(
      { limit: limit_infinite_messagess, id: params.id },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    );
  const messages = data?.pages[0]?.ietms ?? [];

  const {
    mutate,
    isPending,
    status,
    isSuccess: isAiThinkCompleted,
  } = useMutation({
    async mutationFn(body: any) {
      const message = JSON.parse(body);

      const res = await fetch(`/api/messages/${params.id}`, {
        method: "POST",
        body,
      });
      if (!res.ok) {
        return {
          message,
          stream: null,
        };
      }
      const contentType = res.headers.get("Content-Type");
      if (contentType == "application/json")
        return {
          message,
          type: "json",
          data: await res.json(),
        };
      return {
        message,
        type: "stream",
        data: await res.body,
      };
    },
    async onMutate(opts: any) {
      const message = JSON.parse(opts);
      if (selectdTechnology) {
        const id = Date.now();
        await utils.messages.infiniteConversationMessages.cancel();
        utils.messages.infiniteConversationMessages.getInfiniteData();
        utils.messages.infiniteConversationMessages.setInfiniteData(
          { limit: limit_infinite_messagess, id: message.conversationId },
          (data) => {
            if (data) {
              data.pages[0].ietms = [
                ...data.pages[0].ietms,
                {
                  ...message,
                  id: Date.now(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ];
            }
            return data;
          }
        );
      }
    },
    async onSuccess(obj) {
      setAiMessage("");
      const { data: aiResponse, message, type } = obj;
      if (!aiResponse) {
        toast.error("There was a problem sending this message");
      }

      if (type == "json") {
        console.log("______json data: ", aiResponse);

        await utils.messages.infiniteConversationMessages.cancel();
        utils.messages.infiniteConversationMessages.getInfiniteData();

        utils.messages.infiniteConversationMessages.setInfiniteData(
          { limit: limit_infinite_messagess, id: message.conversationId },
          (data) => {
            console.log("is_data", data);

            if (data) {
              setAiMessage(aiResponse?.content);
              console.log(
                "befor",
                data.pages[0].ietms[data.pages[0].ietms.length - 1]
              );

              data.pages[0].ietms = [...data.pages[0].ietms, aiResponse];
              console.log(
                "after",
                data.pages[0].ietms[data.pages[0].ietms.length - 1]
              );
            }

            return data;
          }
        );
      } else {
        const reader: any = aiResponse?.getReader();
        const decoder = new TextDecoder();
        let done = false;
        const cMId = crypto.randomUUID();
        let textResponse = "";

        while (!done) {
          const { value, done: doneReading } = await reader?.read();
          const chunkValue = decoder.decode(value);
          done = doneReading;

          textResponse += chunkValue;
          setAiMessage(textResponse);
          await utils.messages.infiniteConversationMessages.cancel();

          utils.messages.infiniteConversationMessages.getInfiniteData();

          utils.messages.infiniteConversationMessages.setInfiniteData(
            { limit: limit_infinite_messagess, id: message.conversationId },
            (data) => {
              if (!data) {
                return {
                  pages: [],
                  pageParams: [],
                };
              }
              let items = data.pages[0].ietms;
              const isExts = items.find((item) => {
                return item.id == cMId;
              });

              if (isExts) {
                items = items.map((item) => {
                  if (item.id == cMId)
                    return {
                      ...item,
                      content: textResponse,
                    };
                  return item;
                });
              } else {
                items = [
                  ...items,
                  {
                    id: cMId,
                    fromMachin: true,
                    content: textResponse,
                  },
                ];
              }
              data.pages[0].ietms = items;
              return data;
            }
          );
        }
      }
    },
    onError(_, __, context) {
      console.log("onError", context);
      setAiMessage("");
      // utils.messages.infiniteConversationMessages.setData({id:context})
      // .getFileMessages.setData(
      //   { fileId },
      //   { messages: context?.previousMessages ?? [] }
      // )
    },
    onSettled(data, error, variables, context) {},
  });

  const hanldeSendMessage = (data: any) => mutate(data);

  return (
    <div className=" w-full h-screen  bg-[#EEEEEE]">
      <ChatAside />
      <LkNavbar navsData={authNavigation} />

      {isLoading && (
        <div className="chat-area flex h-full items-center justify-center">
          <Spinner />
        </div>
      )}

      {isSuccess && <ListOfMessages messages={messages} />}

      <CreateMessage
        hanldeSendMessage={hanldeSendMessage}
        isAiThink={isPending}
        isAiThinkCompleted={!isPending}
      />
    </div>
  );
};

export default ConversationPage;

/*



*/
