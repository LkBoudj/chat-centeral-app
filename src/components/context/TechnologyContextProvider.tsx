"use client";
import { useDisclosure } from "@nextui-org/react";
import React, { PropsWithChildren, createContext, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

export const techContext = createContext<any>(null);
const TechnologyContextProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenU,
    onOpen: onOpenU,
    onOpenChange: onOpenChangeU,
  } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [items, setItems] = useState<any[]>([]);
  const [customErrors, setCustomErros] = useState({});
  const getItems = async () => {
    const res = await fetch("/api/dashboard/technology");

    if (res.ok) {
      const json = await res.json();
      setItems(json.items);
    }
  };

  const createItem = async (body: FormData) => {
    const res = await fetch("/api/dashboard/technology", {
      method: "post",
      body,
    });

    if (!res.ok) {
      const result = await res.json();
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
      }
      toast.error("there is a problem");
    } else {
      toast.success("Your Technology created successfully");
      onOpenChange && onOpenChange();
      return true;
    }

    return false;
  };

  const deleteItem = async (id: any) => {
    const res = await fetch("/api/dashboard/technology", {
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

  const handelEditItemButton = (item: any) => {
    setSelectedItem(item);
    onOpenU();
  };
  const updateItem = async (body: FormData) => {
    const res = await fetch("/api/dashboard/technology", {
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
        toast.error("there is a problem");
      }
    } else {
      toast.success("Your Technology updated successfully");
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
    updateItem,
  };
  return <techContext.Provider value={value}>{children}</techContext.Provider>;
};

export default TechnologyContextProvider;
