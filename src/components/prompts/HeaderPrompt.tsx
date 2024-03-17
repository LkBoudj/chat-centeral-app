import { User } from "@nextui-org/react";
import moment from "moment";
import IconButton from "../global/IconButton";
import { Pencil } from "lucide-react";
import { promptContext } from "../context/PromptContextProvider";
import { useContext } from "react";

const HeaderPrompt = ({ prompt }: any) => {
  const { hanldeEditPrompt } = useContext(promptContext);
  return (
    <div className="flex items-center justify-center w-full">
      <User name="Thu Le" description={moment(new Date()).fromNow()} />
      <IconButton
        className="text-primary-500 p-0   h-[25px]"
        size={16}
        Icon={Pencil}
        onClick={() => hanldeEditPrompt(prompt)}
      />
    </div>
  );
};

export default HeaderPrompt;
