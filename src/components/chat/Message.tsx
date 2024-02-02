import { Image, Avatar, cn } from "@nextui-org/react";
import { Bot } from "lucide-react";
import moment from "moment";
import siteConfig from "@/lib/configs/siteConfig";
import { Media, Technology } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { forwardRef } from "react";

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

const MediaType = ({ media }: { media: Media }) => {
  const type = media.type.trim().toLowerCase();

  if (type.startsWith("image")) {
    return (
      <Image
        key={Date.now()}
        alt={"ai image"}
        width={250}
        height={250}
        className="w-[250px] rounded"
        src={media.src}
      />
    );
  }
  if (type.startsWith("audio")) {
    return (
      <div>
        <audio controls>
          <source src={media.src} type="audio/mp3" />
          Your browser does not support the video tag.
        </audio>
      </div>
    );
  }

  if (type.startsWith("vide")) {
    return (
      <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return null;
};
const MessageMedia = ({
  media,
  fromMachin,
}: {
  media: Media[];
  fromMachin?: boolean;
}) => {
  return (
    <div className={cn(`w-full flex `, !fromMachin && "justify-end")}>
      <div
        className={cn(
          " w-full my-4 max-w-lg grid gap-4 ",
          `  grid-cols-${media.length > 1 ? 2 : 1}`,
          !fromMachin && "justify-end"
        )}
      >
        {media.map((m, index) => (
          <MediaType key={index} media={m} />
        ))}
      </div>
    </div>
  );
};
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
          "text-[14px] w-full  flex",
          fromMachin ? " justify-start" : "justify-end"
        )}
      >
        <div className=" max-w-[1000px]  space-y-2">
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
            <MessageMedia fromMachin={fromMachin} media={media} />
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
