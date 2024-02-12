"use client";
import { hanldeCustomErrorsZod } from "@/lib/utlis";
import { useDisclosure } from "@nextui-org/react";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";
import { globalContext } from "../GolobalContextProvider";

type Props = {};

export const dashUserContext = createContext<any>(null);
const DashUserContextProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenU,
    onOpen: onOpenU,
    onOpenChange: onOpenChangeU,
  } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [items, setItems] = useState<any[]>([]);
  const [customErrors, setCustomErros] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const { setFile } = useContext(globalContext);
  const getItems = async () => {
    setIsloading(true);
    const res = await fetch("/api/dashboard/users");

    if (res.ok) {
      const json = await res.json();
      setItems(json.items);
      setIsloading(false);
    }
  };

  const createItem = async (body: string, callBack?: () => void) => {
    const res = await fetch("/api/dashboard/users", {
      method: "post",
      body,
    });

    if (!res.ok) {
      const result = await res.json();
      if (!result.success) {
        hanldeCustomErrorsZod(result?.errors, setCustomErros);
      }
      toast.error("there is a problem");
    } else {
      toast.success("Your User created successfully");
      callBack && callBack();
      setFile(null);
      setCustomErros({});
      onOpenChange && onOpenChange();
      return true;
    }

    return false;
  };

  const deleteItem = async (id: any) => {
    const res = await fetch("/api/dashboard/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      const { success } = await res.json();
      if (success) {
        const newItems = items.filter((item: any) => {
          if (item?.id != id) return item;
        });
        setItems(newItems);
        toast.success("technology deleted successfully");
      }
    }
  };

  const handelCreate = () => {
    setCustomErros({});
    onOpen();
  };
  const handelEditItemButton = (item: any) => {
    setCustomErros({});
    setSelectedItem(item);

    onOpenU();
  };
  const updateItem = async (body: string, callBack?: () => void) => {
    const res = await fetch("/api/dashboard/users", {
      method: "put",
      body,
    });

    const result = await res.json();
    if (!res.ok) {
      if (!result.success) {
        let customBackErrors = {};
        result?.errors?.forEach((e: any) => {
          customBackErrors = {
            ...customBackErrors,
            [e.path[0]]: {
              message: e.message,
            },
          };
          return {
            [e.path[0]]: e.message,
          };
        });
        setCustomErros(customBackErrors);
        setFile(null);
        toast.error("there is a problem");
      }
    } else {
      toast.success("The user updated successfully");
      callBack && callBack();
      setCustomErros({});
      onOpenChangeU && onOpenChangeU();

      const updatedItems: any[] = items.map((item: any) => {
        return item.id == selectedItem.id ? result?.item : item;
      });
      setItems(updatedItems);
      return true;
    }

    return false;
  };
  const value = {
    selectedItem,
    setSelectedItem,
    //----------------
    isOpen,
    onOpen,
    onOpenChange,
    //---------------

    isOpenU,
    onOpenU,
    onOpenChangeU,
    //-----------
    items,
    setItems,
    //----
    customErrors,
    setCustomErros,
    //---
    getItems,
    createItem,
    deleteItem,
    handelEditItemButton,
    handelCreate,
    updateItem,

    //--
    isLoading,
    setIsloading,
  };
  return (
    <dashUserContext.Provider value={value}>
      {children}
    </dashUserContext.Provider>
  );
};

export default DashUserContextProvider;
