import { Button } from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";

type Props = {};

const ChatItemAction = (props: Props) => {
  return (
    <div className="flex items-center ">
      <Button
        className="p-0 hover:text-blue-500 "
        variant="light"
        size="sm"
        isIconOnly
      >
        <Pencil size={15} />
      </Button>
      <Button
        variant="light"
        className="p-0 hover:text-red-600"
        size="sm"
        isIconOnly
      >
        <Trash2 size={15} />
      </Button>
    </div>
  );
};

export default ChatItemAction;
