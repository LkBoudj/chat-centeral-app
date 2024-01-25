"use client";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import TrpcProvider from "./TrpcProvider";
const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TrpcProvider>
      <NextUIProvider>
        <Toaster />
        {children}
      </NextUIProvider>
    </TrpcProvider>
  );
};

export default Provider;
