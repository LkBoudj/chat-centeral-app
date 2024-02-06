import { IconButton } from "@/components";
import { techContext } from "@/components/context/TechnologyContextProvider";

import { Chip, Tooltip, User } from "@nextui-org/react";
import { Eye, Edit, Delete } from "lucide-react";
import React, { useCallback, useContext } from "react";
import toast from "react-hot-toast";

const columns = [
  { label: "name", key: "name" },
  { label: "ref", key: "refTech" },
  { label: "models", key: "models" },
  { label: "status", key: "status" },
  { label: "createdAt", key: "updatedAt" },
  { label: "ACTIONS", key: "actions" },
];

const useTechnologyHoeck = () => {
  const {
    handelEditItemButton,
    items,
    deleteItem,

    selectedItem,
  } = useContext(techContext);

  const renderCell = useCallback(
    (items: any, key: string) => {
      const data = items[key];

      switch (key) {
        case "name":
          return (
            <User
              name={data}
              avatarProps={{ radius: "lg", src: `${items.logo}` }}
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
export default useTechnologyHoeck;
