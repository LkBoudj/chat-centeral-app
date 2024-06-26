import { Button } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Icon: LucideIcon;
  className?: string;
  size?: number;
  onClick?: (key?: any) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onPress?: (key?: any) => void;
  endContent?: React.ReactNode;
  content?: string;
  color?:
    | "default"
    | "warning"
    | "success"
    | "danger"
    | "primary"
    | "secondary";
};

const IconButton = ({
  endContent,
  Icon,
  size = 20,
  onClick,
  isDisabled,
  type,
  isLoading,
  className,
  onPress,
  content,
  color,
}: Props) => {
  return (
    <Button
      type={type}
      color={color}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={onClick}
      endContent={endContent}
      size="sm"
      isIconOnly
      variant="light"
      className={className}
      onPress={onPress}
    >
      <span>
        <Icon size={size} />
        {content}
      </span>
    </Button>
  );
};

export default IconButton;
