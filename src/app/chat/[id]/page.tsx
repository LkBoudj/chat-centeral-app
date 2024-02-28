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
  const {
    selectdTechnology,
    setCurrentConversationId,
    isSuccessM,
    isLoadingM,
    messages,
    setMessages,
    sessionUser,
  } = useContext(chatContext);

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
        setMessages((messages: any[]) => [
          ...messages,
          {
            ...message,
            id: Date.now(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }
    },
    async onSuccess(obj) {
      const { data: aiResponse, message, type } = obj;
     
      if (!aiResponse) {
        toast.error("There was a problem sending this message");
      }
      if (type == "json") {
      
        setMessages((messages: any[]) => [...messages, aiResponse]);
      } else {
      
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
           console.log(responseText)
          setAiMessage(responseText)
          const updatedMessages = newData.map((message: any) => {
            if (message.id == id) {
              message.content = responseText;
            }
            return message;
          });
          setMessages(updatedMessages);
          if (done) {break};
        }
      }
    },
    onError(_, __, context) {},
    onSettled(data, error, variables, context) {},
  });

  const hanldeSendMessage = (data: any) => {
    mutate(data);
  };

  useEffect(() => {
    setCurrentConversationId(params.id);
  }, [params.id, setCurrentConversationId]);
 useEffect(()=>{},[aiMessage]);
  return (
    <>
      {isLoadingM ? (
        <div className="chat-area flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          
          {isSuccessM && <ListOfMessages messages={messages} />}
        
          <CreateMessage
            hanldeSendMessage={hanldeSendMessage}
            isAiThink={isPending}
            isAiThinkCompleted={!isPending}
          />
        </>
      )}
    </>
  );
};

export default ConversationPage;

/*



*/
