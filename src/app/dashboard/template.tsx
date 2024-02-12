"use client";
import { DashboardAside } from "@/components";
import { dashNavigation } from "@/lib/data/authNavigation";
import DashBordProvider from "@/components/context/dashboard";
import React, { PropsWithChildren } from "react";

type Props = {};

const DashboardTemplate = ({ children }: PropsWithChildren) => {
  return (
    <DashBordProvider>
      <div className="flex w-full h-screen">
        <DashboardAside dashNavigation={dashNavigation} />
        {children}
      </div>
    </DashBordProvider>
  );
};

export default DashboardTemplate;
