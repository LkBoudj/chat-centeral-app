"use client";
import { LkNavbar } from "@/components";
import PromptContextProvider from "@/components/context/PromptContextProvider";
import { authNavigation } from "@/lib/data/authNavigation";
import React from "react";

const PageTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <PromptContextProvider>
      <LkNavbar navsData={authNavigation} className={"z-50"} />

      {children}
    </PromptContextProvider>
  );
};

export default PageTemplate;
