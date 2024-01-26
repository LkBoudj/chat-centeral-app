import { Textarea } from "@nextui-org/react";
import { Mic, SendHorizontal, Paperclip } from "lucide-react";
import { ContainerMaxWind, IconButton } from "..";

type Props = {};

const CreateMessage = (props: Props) => {
  return (
    <div className="absolute bottom-[12px] w-full left-0 pr-[370px]">
      <ContainerMaxWind className=" max-w-7xl mx-auto ">
        <div className="bg-white rounded-xl ring-1 p-5 ">
          <div className="flex items-start">
            <Textarea
              minRows={1}
              placeholder="Ask me any think"
              variant="bordered"
              color="default"
              classNames={{
                inputWrapper: "border-none shadow-none ",
              }}
              className=" placeholder:text-slate-800 placeholder:font-semibold bg-transparent w-full "
            />

            <IconButton size={22} Icon={Mic} />
          </div>
          <div className="flex items-end justify-between">
            <IconButton size={22} Icon={Paperclip} />
            <IconButton size={22} Icon={SendHorizontal} />
          </div>
        </div>
      </ContainerMaxWind>
    </div>
  );
};

export default CreateMessage;
