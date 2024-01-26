"use client";
import moment from "moment";
import ChatItemAction from "./ChatItemAction ";
import { useContext, useState } from "react";
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

type Props = {
  items: Conversation[];
  isHaveNext?: boolean;
  handlePreviousPage: (key: any) => void;
  handelNextPage: (key: any) => void;
  page: number;
};

const ListOfChats = ({
  items,
  isHaveNext,
  handlePreviousPage,
  handelNextPage,
  page,
}: Props) => {
  const [selected, setSelectedChat] = useState<any>(0);

  const handelSelection = (key: any) => setSelectedChat(key);

  return (
    <Card shadow="none" className=" ring-1 ring-gray-100 shadow-md w-full ">
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
            className="space-y-8"
            //selectedKeys={selected}
            onSelectionChange={handelSelection}
            onAction={(key) => setSelectedChat(key)}
          >
            {items?.map((item, i) => {
              return (
                <ListboxItem
                  href={`/chat/${item.slug}`}
                  className={cn(
                    "border-b hover:border-b-0 border-gray-100 hover:border-l-3 hover:border-blue-600",
                    item.id == Number(selected) &&
                      "border-l-3 border-blue-600 border-b-0"
                  )}
                  key={item.id.toString()}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[13px]">
                      {item.id} {item.title.substring(0, 15)}
                    </p>
                    {item.id == Number(selected) ? (
                      <ChatItemAction />
                    ) : (
                      <span className="text-[11px] py-3">
                        {moment().startOf("hour").fromNow()}
                      </span>
                    )}
                  </div>
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
