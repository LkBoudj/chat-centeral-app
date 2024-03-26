"use client";
import React from "react";
import IconButton from "../global/IconButton";
import { ClipboardCheck, Copy } from "lucide-react";
import { cn } from "@nextui-org/react";

export default function CodeCopyBtn({
  children,
  content,
  className,
}: {
  className?: string;
  children?: any;
  content?: string;
}) {
  const [copyOk, setCopyOk] = React.useState(false);

  const handleClick = (e: any) => {
    navigator.clipboard.writeText(content ? content : children.props.children);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <div className="code-copy-btn w-full flex justify-end">
      <IconButton
        onClick={handleClick}
        className={cn("text-white  ", className)}
        size={18}
        Icon={!copyOk ? Copy : ClipboardCheck}
      />
    </div>
  );
}
