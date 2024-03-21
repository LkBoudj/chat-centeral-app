"use client";
import { trpc } from "@/trpc/client";
import useInfiniteConversation from "./useInfiniteConversation";
import { useRouter } from "next/navigation";
import { conversations_page } from "@/lib/configs/routes_name";

const useConversationHock = () => {
  const route = useRouter();
  const {
    handelNextPageC,
    handlePreviousPageC,
    pageC,
    isSuccessC,
    isHaveNextC,
    chats,
    setChats,
  } = useInfiniteConversation();
  const { mutate } = trpc.conversations.delete.useMutation({
    async onMutate(item: any) {
      const deleteChats = chats.filter((chat: any) => chat.id != item.id);
      setChats(deleteChats);
      route.push(conversations_page);
    },
    async onSuccess(opt) {
      //  console.log(opt);
    },
  });
  const handelDeleteConversation = (key: any) => {
    mutate(key);
  };
  return {
    handelNextPageC,
    handlePreviousPageC,
    pageC,
    isSuccessC,
    isHaveNextC,
    chats,
    setChats,
    handelDeleteConversation,
  };
};

export default useConversationHock;
