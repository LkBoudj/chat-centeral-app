import { Button } from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { chatContext } from "../context/ChatContextProvider";
import { IconButton } from "..";

type Props = {
  id: string;
};

const ChatItemAction = ({ id }: Props) => {
  const { handelDeleteConversation } = useContext(chatContext);
  return (
    <div className="flex items-center ">
      <IconButton
        className="p-0 hover:text-blue-500 "
        Icon={Pencil}
        size={15}
      />
      <IconButton
        className="p-0 hover:text-red-600 "
        Icon={Trash2}
        size={15}
        onClick={() => handelDeleteConversation({ id })}
      />
    </div>
  );
};

export default ChatItemAction;
