"use client";
import { Tab, Tabs } from "@nextui-org/react";
import ListOfChats from "./ListOfChats";
import { useInfiniteConversation } from "@/lib/hocks";
import { ChatOptions } from "..";

type Props = {};
const ChatAside = (props: Props) => {
  const {
    handelNextPage,
    handlePreviousPage,
    page,
    isSuccess,
    isHaveNext,
    items,
  } = useInfiniteConversation();
  return (
    <aside className="  absolute right-0 top-20  w-full hidden lg:block  z-50 max-w-[370px] pr-5">
      <Tabs className="mt-3 font-bold" variant="underlined" color="primary">
        <Tab key="activty" title="Recent activity">
          <ListOfChats
            isHaveNext={isHaveNext}
            items={items}
            handlePreviousPage={handlePreviousPage}
            handelNextPage={handelNextPage}
            page={page}
          />
        </Tab>
        <Tab key="Options" title="Options Technolgy">
          <ChatOptions />
        </Tab>
      </Tabs>
    </aside>
  );
};

export default ChatAside;
