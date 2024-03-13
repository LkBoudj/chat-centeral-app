"use client";
import { LkNavbar } from "@/components";
import PronptContextProvider from "@/components/context/PromptContextProvider";
import { authNavigation } from "@/lib/data/authNavigation";
import React from "react";

const PageTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <PronptContextProvider>
      <div className="h-screen overflow-hidden">
        <LkNavbar navsData={authNavigation} className={"z-50"} />

        {children}
      </div>
    </PronptContextProvider>
  );
};

export default PageTemplate;
