"use client";
import React, { createContext, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export const ConfigContext = createContext<any>([]);

const ConfigProvider = ({ children }: Props) => {
  const [activeItem, setActiveItem] = useState("home");
  const handelClick = (val: any) => {
    setActiveItem(val.name.toLowerCase());
    if (val.sectionId.current) {
      window.scrollTo({
        top: val.sectionId?.current.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };
  const main = useRef(null);
  const about = useRef(null);
  const testimonials = useRef(null);
  const featurs = useRef(null);
  const apps = useRef(null);
  const contact = useRef(null);
  const success = useRef(null);

  const dataOfNav: Array<any> = [
    { name: "Home", sectionId: main },
    // { name: "Testimonials", sectionId: testimonials },
    { name: "Features", sectionId: featurs },
    { name: "Pricing", sectionId: about },
    { name: "Apps", sectionId: apps },
    { name: "Contact", sectionId: contact },
    { name: "Success", sectionId: success },
  ];
  return (
    <ConfigContext.Provider value={{ dataOfNav, activeItem, handelClick }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
