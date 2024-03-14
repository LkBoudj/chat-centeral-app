import { Button, Input, cn } from "@nextui-org/react";
import { Search, SquarePen } from "lucide-react";
import IconButton from "../global/IconButton";

type PromptHeaderProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSearch: (key: any) => void;
  value: string;
  onOpen: () => void;
};

const PromptHeader: React.FC<PromptHeaderProps> = ({
  setValue,
  setSearch,
  onOpen,
  value,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverce   items-center justify-between gap-2  w-full px-8"
      )}
    >
      <Input
        onValueChange={setValue}
        onKeyDown={(e) => {
          e.key == "Enter" && setSearch(value);
        }}
        onClear={() => {
          setValue("");
          setSearch("");
        }}
        value={value}
        startContent={<Search />}
        className="max-w-md"
        placeholder="search ..."
      />

      <IconButton
        className="md:hidden text-blue-500"
        onPress={onOpen}
        Icon={SquarePen}
      />
      <Button
        className="hidden md:flex"
        onPress={onOpen}
        startContent={<SquarePen size={20} />}
        color="primary"
      >
        wirte prompt
      </Button>
    </div>
  );
};

export default PromptHeader;
