"use client";
import { Snippet } from "@nextui-org/react";
import { IconButton } from "..";
import { ClipboardCheck, Copy } from "lucide-react";
import { useContext } from "react";
import { chatContext } from "../context/ChatContextProvider";
type Props = {};

const CopyPaste = ({ children }: any) => {
  const { handelTextToCopy, copy } = useContext(chatContext);
  return (
    <pre className="blog-pre  ">
      <div className="w-full flex justify-end">
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(children[0].props.children[0]);
          }}
          className="text-white  "
          Icon={!copy ? Copy : ClipboardCheck}
        />
      </div>
      {children}
    </pre>
  );
};

export default CopyPaste;
