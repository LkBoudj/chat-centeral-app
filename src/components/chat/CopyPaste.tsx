"use client";
import React from "react";
import IconButton from "../global/IconButton";
import { ClipboardCheck, Copy } from "lucide-react";
export default function CodeCopyBtn({ children }: any) {
  const [copyOk, setCopyOk] = React.useState(false);

  const handleClick = (e: any) => {
    navigator.clipboard.writeText(children.props.children[0]);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <div className="code-copy-btn w-full flex justify-end">
      <IconButton
        onClick={handleClick}
        className="text-white  "
        Icon={!copyOk ? Copy : ClipboardCheck}
      />
    </div>
  );
}
