import { Button, Link } from "@nextui-org/react";
import React from "react";

type Props = {};

const GuestComponnet = (props: Props) => {
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
};

export default GuestComponnet;
