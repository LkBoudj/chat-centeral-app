"use client";
import { Tab, Tabs, cn } from "@nextui-org/react";
import ListOfChats from "./ListOfChats";

import { ChatOptions } from "..";
import { useContext } from "react";
import { chatContext } from "../context/ChatContextProvider";

type Props = {};
const ChatAside = (props: Props) => {
  const {
    chats,
    isHaveNextC,
    pageC,
    handlePreviousPageC,
    handelNextPageC,
    isOpenAside,
  } = useContext(chatContext);

  return (
    <>
      <aside
        className={cn(
          `fixed right-0 top-0  pt-20  bg-[#eee]  transition-all  duration-100  w-full transform   z-40 max-w-[370px] pr-5`,
          !isOpenAside ? "translate-x-0" : "translate-x-full "
        )}
      >
        <Tabs className="mt-3 font-bold" variant="underlined" color="primary">
          <Tab key="activty" title="Recent activity">
            <ListOfChats
              isHaveNext={isHaveNextC}
              items={chats}
              handlePreviousPage={handlePreviousPageC}
              handelNextPage={handelNextPageC}
              page={pageC}
            />
          </Tab>
          <Tab key="Options" title="Technology Options">
            <ChatOptions />
          </Tab>
        </Tabs>
      </aside>
    </>
  );
};

export default ChatAside;
