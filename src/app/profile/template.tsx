"use client";
import { LkNavbar } from "@/components";
import { authNavigation } from "@/lib/data/authNavigation";

type Props = {
  children: React.ReactNode;
};

const ProfileTemplate = ({ children }: Props) => {
  return (
    <div>
      <LkNavbar navsData={authNavigation} />
      {children}
    </div>
  );
};

export default ProfileTemplate;
