"use client";
import { LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import React from "react";

const PageTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-screen overflow-hidden">
      <LkNavbar navsData={authNavigation} className={"z-50"} />

      {children}
    </div>
  );
};

export default PageTemplate;
