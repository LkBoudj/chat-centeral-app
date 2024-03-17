"use client";
import { LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";
import React from "react";

const PageTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <LkNavbar navsData={authNavigation} className={"z-50"} />

      {children}
    </>
  );
};

export default PageTemplate;
