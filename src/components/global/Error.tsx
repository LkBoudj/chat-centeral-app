import { Spinner, Image } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";

type Props = {};

const Error = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 z-50">
      {children ?? (
        <Image className="max-w-sm" src="/images/robot.png" alt="error" />
      )}
    </div>
  );
};

export default Error;
