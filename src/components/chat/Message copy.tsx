import { Avatar, cn } from "@nextui-org/react";
import { Bot } from "lucide-react";

import siteConfig from "@/lib/configs/siteConfig";
import { Media, Technology } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { forwardRef } from "react";
import { MediaContainer } from "./CustmMediaMediaComponent";
import CopyPaste from "./CopyPaste";

const isRightToLift = (text: string) => {
  const regex = /[\u0600-\u06FF]/;
  return regex.test(text);
};

const MessageFotter = ({ technology }: { technology: Technology }) => (
  <div>
    {technology?.logo ? (
      <Avatar className="w-[28px] h-[28px]" src={technology?.logo} />
    ) : (
      <Bot className=" " size={50} />
    )}
  </div>
);

const BodyMessage = ({
  fromMachin,
  content,
}: {
  fromMachin?: boolean;
  content: string;
}) => {
  return (
    <ReactMarkdown
      components={{
        pre: CopyPaste,
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            //@ts-ignore
            <Prism
              {...rest}
              PreTag="div"
              language={match[1]}
              style={{ ...okaidia }}
            >
              {String(children).replace(/\n$/, "")}
            </Prism>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
      className={cn(
        `markdown 
            
              prose 
              prose-p:text-[12px]
              prose-p:font-meduim  
              prose-[12px] 
              break-words
           
            transition-all
            place-self-start
            rounded-xl px-3 py-2  leading-[2.3]
            w-full
            max-w-full
            `,
        fromMachin
          ? "bg-[#fcfcfc] text-slate-800 "
          : "bg-gradient-to-r from-indigo-500 to-blue-600 text-white "
      )}
    >
      {content}
    </ReactMarkdown>
  );
};

type MessageType = {
  id?: any;
  fromMachin?: boolean;
  content: any;
  technology?: Technology;
  media?: Media[];
  ref?: any;
};
const Message = forwardRef<HTMLDivElement, MessageType>(
  ({ id, content, fromMachin, technology, media }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          " w-full  flex",
          fromMachin ? " justify-start" : "justify-end"
        )}
      >
        <div className=" max-w-[1000px]  space-y-1">
          {fromMachin && (
            <span className="px-1 capitalize  font-semibold text-slate-800">
              {technology?.name ?? siteConfig.name}
            </span>
          )}
          {content ? (
            <BodyMessage content={content} fromMachin={fromMachin} />
          ) : (
            ""
          )}

          {media?.length ? (
            <MediaContainer fromMachin={fromMachin} media={media ?? []} />
          ) : (
            ""
          )}
          {fromMachin && technology && (
            <MessageFotter technology={technology} />
          )}
        </div>
      </div>
    );
  }
);
Message.displayName = "Message";
export default Message;
