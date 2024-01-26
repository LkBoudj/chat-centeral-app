import ChatContextProvider from "@/components/context/ChatContextProvider";
import { PropsWithChildren } from "react";

const ChatTemplate = ({ children }: PropsWithChildren) => {
  return <ChatContextProvider>{children}</ChatContextProvider>;
};

export default ChatTemplate;
