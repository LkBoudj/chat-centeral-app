"use client";

import { IconButton } from "@/components";
import { techContext } from "@/components/context/TechnologyContextProvider";
import { CreateTechnology } from "@/components/dashboard";
import UpdateTechnology from "@/components/dashboard/technologies/UpdateTechnology";
import { CustomTable } from "@/components/global/table";
import { useTechnologyHoeck } from "@/lib/hocks";
import { ScrollShadow } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useContext, useEffect } from "react";

type Props = {};

const TechnologyPage = (props: Props) => {
  const { renderCell, columns } = useTechnologyHoeck();
  const { isOpen, onOpen, items, getItems, selectedItem, isOpenU } =
    useContext(techContext);
  useEffect(() => {
    getItems();
  }, []);
  return (
    <ScrollShadow className="w-full h-full space-y-2">
      {isOpen && <CreateTechnology />}
      {isOpenU && <UpdateTechnology />}
      <div className="flex items-center justify-between w-full px-2 py-4">
        <div> selected item {selectedItem?.id}</div>
        <IconButton
          className="bg-blue-500 px-2 text-white hover:text-blue-700"
          onPress={onOpen}
          Icon={Plus}
        />
      </div>
      <CustomTable items={items} columns={columns} renderCell={renderCell} />
    </ScrollShadow>
  );
};

export default TechnologyPage;
