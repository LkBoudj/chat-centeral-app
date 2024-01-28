"use client";
import { Button, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import AuthComponent from "./AuthComponent";
import GuestComponnet from "./GuestComponnet";

type Props = {};

const AuthanticationButton = (props: Props) => {
  const { data: session, status } = useSession();

  return status == "unauthenticated" ? <GuestComponnet /> : <AuthComponent />;
};

export default AuthanticationButton;
