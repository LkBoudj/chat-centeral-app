"use client";
import { Button, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";

type Props = {};

const AuthanticationButton = (props: Props) => {
  const { data: session, status } = useSession();

  if (status == "unauthenticated")
    return (
      <div>
        <Button
          as={Link}
          className="border-r rounded-none text-slate-700"
          color="primary"
          href="/login"
          variant="light"
        >
          Sign In
        </Button>
        <Button
          className="text-slate-700 rounded-none"
          as={Link}
          color="primary"
          href="/regiser"
          variant="light"
        >
          Sign Up
        </Button>
      </div>
    );
  else return <p>you is Authnaticated</p>;
};

export default AuthanticationButton;
