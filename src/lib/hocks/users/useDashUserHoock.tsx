import { IconButton } from "@/components";
import { dashUserContext } from "@/components/context/dashboard/DashUserContextProvider";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { Eye, Edit, Delete } from "lucide-react";
import React, { useCallback, useContext } from "react";

type Props = {};

const columns = [
  { label: "name", key: "name" },
  { label: "status", key: "status" },
  { label: "role", key: "roles" },
  { label: "createdAt", key: "updatedAt" },
  { label: "ACTIONS", key: "actions" },
];
const useDashUserHoock = () => {
  const { handelEditItemButton, items, deleteItem, selectedItem } =
    useContext(dashUserContext);
  const renderCell = useCallback(
    (items: any, key: string) => {
      const data = items[key];

      switch (key) {
        case "name":
          return (
            <User
              name={data}
              avatarProps={{ radius: "lg", src: `${items.image}` }}
              description={items.email}
            />
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={data ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {data ? "active" : "disabled"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-1">
              <Tooltip color="foreground" content="Details">
                <IconButton className="text-green-600" Icon={Eye} />
              </Tooltip>
              <Tooltip color="primary" content="Edit">
                <IconButton
                  onClick={() => handelEditItemButton(items)}
                  className="text-blue-600"
                  Icon={Edit}
                  size={15}
                />
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <IconButton
                  className="text-red-600"
                  onClick={() => deleteItem(items.id)}
                  Icon={Delete}
                />
              </Tooltip>
            </div>
          );
        default:
          return items[key];
      }
    },
    [handelEditItemButton, deleteItem]
  );

  return {
    columns,
    items,
    renderCell,
  };
};

export default useDashUserHoock;
