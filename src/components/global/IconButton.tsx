import { Button } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Icon: LucideIcon;
  size?: number;
  onClick?: (key?: any) => void;
  isDisabled?: boolean;
};

const IconButton = ({ Icon, size = 20, onClick, isDisabled }: Props) => {
  return (
    <Button
      isDisabled={isDisabled}
      onClick={onClick}
      size="sm"
      isIconOnly
      variant="light"
    >
      <Icon size={size} />
    </Button>
  );
};

export default IconButton;
