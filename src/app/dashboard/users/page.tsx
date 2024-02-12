"use client";

import { IconButton, Loading } from "@/components";
import { dashUserContext } from "@/components/context/dashboard/DashUserContextProvider";

import CreateUser from "@/components/dashboard/users/CreateUser";
import UpdateUser from "@/components/dashboard/users/UpdateUser";
import { CustomTable } from "@/components/global/table";
import { useDashUserHoock } from "@/lib/hocks";

import { ScrollShadow } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useContext, useEffect } from "react";

type Props = {};

const UsersPage = (props: Props) => {
  const { renderCell, columns } = useDashUserHoock();
  const {
    isOpen,
    handelCreate,
    items,
    getItems,
    isLoading,
    setIsloading,
    isOpenU,
  } = useContext(dashUserContext);

  useEffect(() => {
    if (isLoading) {
      getItems();
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;
  return (
    <ScrollShadow className="w-full h-full space-y-2 p-5">
      {isOpen && <CreateUser />}
      {isOpenU && <UpdateUser />}
      <div className="flex items-center justify-between w-full px-2 py-4">
        <div> </div>
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

export default UsersPage;
