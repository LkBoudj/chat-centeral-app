"use client";
import { ChatAside, CreateMessage, LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import { ScrollShadow } from "@nextui-org/react";
import ListOfMessages from "@/components/chat/ListOfMessages";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import InitailtMessage from "@/components/chat/InitialMessage";

import { useContext, useState } from "react";
import { chatContext } from "@/components/context/ChatContextProvider";
import { conversations_page } from "@/lib/configs/routes_name";

type Props = {};

const ChatPage = (props: Props) => {
  const router = useRouter();

  const [messages, setMessages] = useState<any>([]);
  const { setChats, chats, selectdTechnology } = useContext(chatContext);

  const { mutate, isPending, isSuccess } = useMutation({
    async mutationFn(body: any) {
      const message = JSON.parse(body);
      const res = await fetch("/api/messages", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        return {
          message,
          stream: null,
        };
      }

      if (res.status != 400) {
        const conversationId = res.headers.get("conversationId");
        const contentType = res.headers.get("Content-Type");
        let result: any = {
          message,
          type: "",
          data: "",
          conversationId,
        };
        if (contentType == "application/json") {
          result.type = "json";
          result.data = await res.json();
        } else {
          result.type = "stream";
          result.data = await res.body;
        }
        return result;
      }
    },
    async onMutate(opts: any) {
      const message = JSON.parse(opts);

      if (selectdTechnology) {
        setMessages((messgaes: any) => [
          ...messgaes,
          {
            ...message,
            id: "Timestamp" + "_" + Date.now(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }
    },
    async onSuccess(obj: any) {
      const { data: aiResponse, message, type, conversationId } = obj;
      if (!aiResponse) {
        toast.error("There was a problem sending this message");
      }
      if (type == "stream") {
        const id = "ai_message_" + Date.now();

        let aiMessage = {
          id,
          content: "",
          fromMachin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const newData = [...messages, aiMessage];
        setMessages(newData);
        const reader: any = aiResponse?.getReader();
        const decoder = new TextDecoder();

        let responseText = "";
        while (true) {
          const { value, done } = await reader?.read();
          const chunkValue = decoder.decode(value);
          responseText += chunkValue;

          const updatedMessages = newData.map((message: any) => {
            if (message.id == id) {
              message.content = responseText;
            }
            return message;
          });
          setMessages(updatedMessages);
          if (done) break;
        }
      } else {
        const newData = [...messages, aiResponse];
        setMessages(newData);
      }
      router.push(`${conversations_page}/${conversationId}`, {
        scroll: true,
      });
    },
    onError(_, __, context) {
      //console.log(context);
    },
  });
  const hanldeSendMessage = (data: any) => mutate(data);

  return (
    <>
      {messages.length ? (
        <ListOfMessages messages={messages} />
      ) : (
        <InitailtMessage />
      )}

      <CreateMessage
        hanldeSendMessage={hanldeSendMessage}
        isAiThink={isPending}
        isAiThinkCompleted={!isPending}
      />
    </>
  );
};

export default ChatPage;
