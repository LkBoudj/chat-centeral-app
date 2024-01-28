import { Avatar, cn } from "@nextui-org/react";
import { Bot } from "lucide-react";
import moment from "moment";
import siteConfig from "@/lib/configs/siteConfig";
import { Technology } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
const isRightToLift = (text: string) => {
  const regex = /[\u0600-\u06FF]/;
  return regex.test(text);
};

const BodyMessage = ({
  fromMachin,
  content,
}: {
  fromMachin?: boolean;
  content: string;
}) => {
  return (
    // <div
    //   className={cn(
    //     " rounded-xl px-3 py-2 font-medium leading-[2.3] ",

    //     fromMachin
    //       ? "bg-[#fcfcfc] text-slate-800 "
    //       : "bg-gradient-to-r from-indigo-500 to-blue-600 text-white "
    //   )}
    // >
    <ReactMarkdown
      components={{
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
              prose-p:font-meduim  
              lg:prose-md 
              break-words
           
            transition-all
            place-self-start
            rounded-xl px-3 py-2  leading-[2.3]
            `,
        fromMachin
          ? "bg-[#fcfcfc] text-slate-800 "
          : "bg-gradient-to-r from-indigo-500 to-blue-600 text-white "
      )}
    >
      {content}
    </ReactMarkdown>
    // </div>
  );
};
const Message = ({
  id,
  content,
  fromMachin,
  technology,
}: {
  id?: any;
  fromMachin?: boolean;
  content: any;
  technology?: Technology;
}) => {
  return (
    <div
      className={cn(
        "text-[14px] w-full  flex  ",
        fromMachin ? " justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          " max-w-[800px] flex  items-end   ",
          fromMachin && "flex-row-reverse"
        )}
      >
        {/* <HeaderMessage technology={technology} fromMachin={fromMachin} /> */}
        <div className="space-y-2">
          {fromMachin && (
            <span className="px-2 capitalize  font-semibold text-slate-800">
              {technology?.name ?? siteConfig.name}
            </span>
          )}
          <BodyMessage content={content} fromMachin={fromMachin} />
        </div>
        <div className="mx-1"></div>
        <div>
          {fromMachin &&
            (technology?.logo ? (
              <Avatar className="w-[28px] h-[28px]" src={technology?.logo} />
            ) : (
              <Bot className=" " size={50} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
