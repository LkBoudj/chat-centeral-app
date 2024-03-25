"use client";
import moment from "moment";
import ChatItemAction from "./ChatItemAction ";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@nextui-org/react";
import { MessageCirclePlus, ChevronRight, ChevronLeft } from "lucide-react";
import { IconButton } from "..";
import { cn } from "@/lib/utlis";
import { Conversation } from "@prisma/client";
import { useParams } from "next/navigation";

import { conversations_page } from "@/lib/configs/routes_name";
import { chatContext } from "../context/ChatContextProvider";
import { useContext } from "react";

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
    <div className="w-full overflow-hidden flex relative items-center justify-between ">
      <Link
        className={cn(
          ` h-full  w-full `,
          isActive ? "text-blue-500" : "text-slate-800"
        )}
        href={`${conversations_page}/${item.id}`}
      >
        <p className="text-sm max-w-[247px]  font-semibold truncate py-3  ">
          {item.title}
        </p>
      </Link>

      <div
        className={cn(
          "z-50  max-w-[244px]  justify-end h-full flex items-center right-0",
          isActive ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ChatItemAction id={item.id} />
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
  const { chats, isSuccessC, hasNextPage } = useContext(chatContext);

  return (
    <Card
      shadow="none"
      className="bg-[#f7f7f7] ring-1 ring-gray-100 shadow-md w-full "
    >
      <CardHeader>
        <Button
          color="primary"
          as={Link}
          href="/chat"
          isDisabled={!id}
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
            {isSuccessC &&
              chats?.map((item: any, i: number) => {
                return (
                  <ListboxItem
                    className={cn(
                      "aside-item-chat rounded-none ",
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
        <span className="mr-1">{page + 1}</span>
        <IconButton
          isDisabled={!hasNextPage}
          onClick={handelNextPage}
          Icon={ChevronRight}
        />
      </CardFooter>
    </Card>
  );
};

export default ListOfChats;
