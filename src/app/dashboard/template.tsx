"use client";
import { DashboardAside } from "@/components";
import { dashNavigation } from "@/lib/data/authNavigation";
import React, { PropsWithChildren } from "react";

type Props = {};

const DashboardTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full h-screen">
      <DashboardAside dashNavigation={dashNavigation} />
      {children}
    </div>
  );
};

export default DashboardTemplate;
