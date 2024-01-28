import { trpc } from "@/trpc/client";

const useConversationHock = () => {
  const { mutate } = trpc.conversations.delete.useMutation({
    onMutate(item) {
      console.log(item);
    },
  });
  const handelDeleteConversation = (key: any) => {
    mutate(key);
  };
  return {
    handelDeleteConversation,
  };
};

export default useConversationHock;
