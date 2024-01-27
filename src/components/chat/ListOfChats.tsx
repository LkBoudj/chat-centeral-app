"use client";
import moment from "moment";
import ChatItemAction from "./ChatItemAction ";
import { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import { MessageCirclePlus, ChevronRight, ChevronLeft } from "lucide-react";
import { IconButton } from "..";
import { cn } from "@/lib/utlis";
import { Conversation } from "@prisma/client";
import { chatContext } from "../context/ChatContextProvider";
import { useParams } from "next/navigation";

type Props = {
  items: Conversation[];
  isHaveNext?: boolean;
  handlePreviousPage: (key: any) => void;
  handelNextPage: (key: any) => void;
  page: number;
};

const ConversationItemOption = ({
  item,
  id,
}: {
  item: Conversation;
  id?: string;
}) => {
  const isActive: boolean = item.id == id;
  return (
    <div className="flex items-center justify-between pr-14">
      <p className="text-sm font-semibold truncate   ">{item.title}</p>
      <div className="absolute   w-24 justify-end h-full flex items-center right-0">
        {isActive ? (
          <ChatItemAction />
        ) : (
          <span className="text-[11px] py-3 px-2">
            {moment(item.updatedAt).startOf("hour").fromNow()}
          </span>
        )}
      </div>
    </div>
  );
};
const ListOfChats = ({
  items,
  isHaveNext,
  handlePreviousPage,
  handelNextPage,
  page,
}: Props) => {
  const { id } = useParams();

  return (
    <Card
      shadow="none"
      className="bg-[#f7f7f7] ring-1 ring-gray-100 shadow-md w-full "
    >
      <CardHeader>
        <Button
          color="primary"
          className="w-full flex bg-gradient-to-r from-indigo-400 to-blue-600 text-white font-bold"
          startContent={<MessageCirclePlus />}
        >
          New Chat
        </Button>
      </CardHeader>
      <CardBody>
        <ScrollShadow className="max-h-[450px]">
          <Listbox
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            className=""
            selectedKeys={id}
          >
            {items?.map((item, i) => {
              return (
                <ListboxItem
                  href={`/chat/${item.id}`}
                  className={cn(
                    "aside-item-chat rounded-none py-4",
                    item.id == id && "border-l-3 border-blue-600 border-b-0"
                  )}
                  key={item.id.toString()}
                >
                  <ConversationItemOption item={item} id={id as string} />
                </ListboxItem>
              );
            })}
          </Listbox>
        </ScrollShadow>
      </CardBody>
      <CardFooter className=" items-center  justify-center">
        <IconButton
          onClick={handlePreviousPage}
          isDisabled={page - 1 <= 0}
          Icon={ChevronLeft}
        />
        <span className="mr-1">{page}</span>
        <IconButton
          isDisabled={!isHaveNext}
          onClick={handelNextPage}
          Icon={ChevronRight}
        />
      </CardFooter>
    </Card>
  );
};

export default ListOfChats;
