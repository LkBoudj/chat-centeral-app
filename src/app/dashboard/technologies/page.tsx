"use client";

import { IconButton, Loading } from "@/components";
import { techContext } from "@/components/context/dashboard/TechnologyContextProvider";
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
  const {
    isLoading,
    isOpen,
    handelCreate,
    items,
    getItems,
    selectedItem,
    isOpenU,
  } = useContext(techContext);
  useEffect(() => {
    if (isLoading) getItems();
  }, [isLoading, getItems]);

  if (isLoading) return <Loading />;
  return (
    <ScrollShadow className="w-full h-full space-y-2 p-5">
      {isOpen && <CreateTechnology />}
      {isOpenU && <UpdateTechnology />}
      <div className="flex items-center justify-between w-full px-2 py-4">
        <div></div>
        <IconButton
          className="bg-blue-500 px-2 text-white hover:text-blue-700"
          onPress={handelCreate}
          Icon={Plus}
        />
      </div>
      <CustomTable items={items} columns={columns} renderCell={renderCell} />
    </ScrollShadow>
  );
};

export default TechnologyPage;
