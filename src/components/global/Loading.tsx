import { Spinner } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";

type Props = {};

const Loading = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 z-50">
      {children ?? <Spinner size="lg" />}
    </div>
  );
};

export default Loading;
