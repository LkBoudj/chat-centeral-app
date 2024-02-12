import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

const useMessageHoock = () => {
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  const { data, isLoading, isSuccess } = trpc.messages.all.useQuery({
    id: currentConversationId,
  });
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [isSuccess, currentConversationId, data]);

  return {
    messages,
    setMessages,
    isLoading,
    isSuccess,
    setCurrentConversationId,
  };
};

export default useMessageHoock;
