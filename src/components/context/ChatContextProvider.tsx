"use client";

import { useInfiniteMessages } from "@/lib/hocks";
import { absoluteUrl } from "@/lib/utlis";
import { trpc } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PropsWithChildren, createContext, useState } from "react";

type ChatContextResponce = {
  currentConversationId: number | null;
  setCurrentConversationId: (key?: any) => void;
};
export const chatContext = createContext<any>(null);

const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const params = useParams();
  const utils = trpc.useUtils();
  const {
    toShow,
    items,
    isLoading,
    isSuccess: isSuccessLoading,
    error,
    isError,
    page,
  } = useInfiniteMessages({
    id: params.id as string,
  });

  const {
    mutate: addNewData,
    isSuccess: isUpdatedSuccess,
    isPending: isUpdatePending,
  } = trpc.messages.create.useMutation({
    async mutationFn(data: any) {
      console.log("mutationFn", data);

      return data;
    },
    async onMutate(opts) {
      await utils.messages.infiniteConversationMessages.cancel();

      utils.messages.infiniteConversationMessages.setInfiniteData(
        {
          limit: 10,
          id: params.id as string,
        },
        (data) => {
          data?.pages[0].ietms.push({
            id: 1,
            content: opts?.content,
            conversationId: opts.conversationId as string,
            userId: 1,
            technologyId: 1,
            fromMachin: false,
            createdAt: "string",
            updatedAt: "string",
          });

          return data;
        }
      );
    },
    onSuccess: (stream) => {
      console.log("success", stream);
    },
    onError(_, __, context) {
      console.log("onError", context);
    },
  });

  const value = {
    isSuccessLoading,
    toShow,
    addNewData,
    isUpdatedSuccess,
    isUpdatePending,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
};

export default ChatContextProvider;
