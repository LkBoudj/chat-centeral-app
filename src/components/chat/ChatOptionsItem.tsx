import { cn } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";
import React from "react";

const ChatOptionsItem = ({
  children,
  Icon,
  title,
  className,
}: {
  children?: React.ReactNode;
  Icon?: LucideIcon;
  title: string;
  className?: string;
}) => {
  return (
    <div className="space-y-3">
      <p className="flex items-center space-x-1 font-bold text-[13px]">
        {Icon && <Icon size={17} />} <span>{title}</span>
      </p>
      <div className={cn("space-x-2", className)}>{children}</div>
    </div>
  );
};

export default ChatOptionsItem;
