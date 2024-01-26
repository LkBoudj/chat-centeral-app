"use client";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import TrpcProvider from "./TrpcProvider";
import { useRouter } from "next/navigation";
const Provider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <TrpcProvider>
      <NextUIProvider navigate={router.push}>
        <Toaster />
        {children}
      </NextUIProvider>
    </TrpcProvider>
  );
};

export default Provider;
