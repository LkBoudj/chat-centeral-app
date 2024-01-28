"use client";
import { ChatAside, CreateMessage, LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import { ScrollShadow } from "@nextui-org/react";
import ListOfMessages from "@/components/chat/ListOfMessages";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import InitailtMessage from "@/components/chat/InitialMessage";

type Props = {};

const ChatPage = (props: Props) => {
  const router = useRouter();

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
        const { conversationId } = await res.json();
        router.push(`/chat/${conversationId}`);
      }
    },
    async onMutate(opts: any) {},
    async onSuccess(data) {},
    onError(_, __, context) {
      console.log(context);
    },
  });
  const hanldeSendMessage = (data: any) => mutate(data);
  return (
    <div className=" w-full h-screen  bg-[#EEEEEE]">
      <ChatAside />
      <LkNavbar navsData={authNavigation} />

      <InitailtMessage />

      <CreateMessage
        hanldeSendMessage={hanldeSendMessage}
        isAiThink={isPending}
        isAiThinkCompleted={!isPending}
      />
    </div>
  );
};

export default ChatPage;
