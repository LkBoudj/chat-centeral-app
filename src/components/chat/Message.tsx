import { cn } from "@nextui-org/react";

const Message = ({
  content,
  formMachin,
}: {
  formMachin?: boolean;
  content: any;
}) => {
  return (
    <div className={cn("w-full flex", formMachin && " justify-end")}>
      <div
        className={cn(
          "max-w-xl rounded-xl px-3 py-3 font-medium leading-relaxed ",
          formMachin
            ? "bg-[#fcfcfc] text-slate-800 "
            : "bg-gradient-to-r from-indigo-500 to-blue-600 text-white "
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
