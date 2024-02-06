import { Button, Link } from "@nextui-org/react";

import React from "react";

type Props = {};

const EmailInput = (props: Props) => {
  return (
    <Link
      href="/register"
      className=" pr-4 rounded shadow-sm w-full flex items-center text-slate-600/50 bg-white"
    >
      <div className="w-full bg-transparent focus:outline-none py-8 px-8">
        <p>type your email address</p>
      </div>
      <Button size="lg" className="font-bold text-[14px] px-9" color="primary">
        Sing up for free
      </Button>
    </Link>
  );
};

export default EmailInput;
