import { Tooltip } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";

const CustomTooltip = ({ children }: PropsWithChildren) => {
  return (
    <Tooltip
      content="I am a tooltip"
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
