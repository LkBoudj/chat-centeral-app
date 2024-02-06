"use client";

import ConfigProvider from "@/components/context/ConfigProvider";
import { conversations_page } from "@/lib/configs/routes_name";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  if (status == "authenticated") return router.push(conversations_page);
  return (
    <ConfigProvider>
      {/* <Navbar /> */}
      {children}
    </ConfigProvider>
  );
}
