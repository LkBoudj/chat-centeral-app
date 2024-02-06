"use client";

import { conversations_page } from "@/lib/configs/routes_name";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  if (status == "authenticated") return router.push(conversations_page);
  return <>{children}</>;
};

export default Layout;
