"use client";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import TrpcProvider from "./TrpcProvider";

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TrpcProvider>
      <NextUIProvider>{children}</NextUIProvider>;
    </TrpcProvider>
  );
};

export default Provider;
