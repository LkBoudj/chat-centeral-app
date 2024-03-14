"use client";
import { LkNavbar } from "@/components";
import PronptContextProvider from "@/components/context/PromptContextProvider";
import { authNavigation } from "@/lib/data/authNavigation";
import React from "react";

const PageTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <PronptContextProvider>
      <LkNavbar navsData={authNavigation} className={"z-50"} />

      {children}
    </PronptContextProvider>
  );
};

export default PageTemplate;
