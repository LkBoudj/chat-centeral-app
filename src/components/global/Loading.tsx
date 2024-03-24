import { cn, Spinner } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const Loading = (props: Props) => {
  const { children, className, ...resetProps } = props;
  return (
    <div
      {...resetProps}
      className={cn(
        "flex items-center justify-center w-full h-full fixed top-0 left-0 z-50",
        className
      )}
    >
      {children ?? <Spinner size="lg" />}
    </div>
  );
};

export default Loading;
