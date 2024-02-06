import { OutputData } from "@editorjs/editorjs";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml();
type Props = {
  data: OutputData;
  className?: string;
};
type ParsedContent = string | JSX.Element;
const RenderEditorJsData = ({ data, className }: Props) => {
  if (!data?.blocks) {
    return <div>No Description</div>;
  }
  const html = EditorJsToHtml.parse(data) as ParsedContent[];
  return (
    <div
      className={twMerge(clsx("prose max-w-full ", className))}
      key={data.time}
    >
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default RenderEditorJsData;
