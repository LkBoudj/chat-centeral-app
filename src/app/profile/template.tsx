"use client";
import { LkNavbar } from "@/components";

import UserContextProvider from "@/components/context/UserContextProvider";
import { authNavigation } from "@/lib/data/authNavigation";

type Props = {
  children: React.ReactNode;
  params?: {};
  searchParams?: {};
};
const ProfileTemplate = ({ children, params, searchParams }: Props) => {
  return (
    <UserContextProvider defaultVal={params}>
      <LkNavbar navsData={authNavigation} />

      {children}
    </UserContextProvider>
  );
};

export default ProfileTemplate;
