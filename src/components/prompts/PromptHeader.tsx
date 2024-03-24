import { Button, Input, cn } from "@nextui-org/react";
import { Search, SlidersHorizontal, SquarePen } from "lucide-react";
import IconButton from "../global/IconButton";
import { useContext } from "react";
import { promptContext } from "../context/PromptContextProvider";

type PromptHeaderProps = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

const PromptHeader: React.FC<PromptHeaderProps> = ({ value, setValue }) => {
  const { setSearch, onOpenCreate, toggleAside, isOpenAside } =
    useContext(promptContext);
  return (
    <div
      className={cn(
        "flex flex-col-revere   items-center justify-between gap-2  w-full px-8"
      )}
    >
      <div className="flex items-center space-x-2 w-full ">
        {isOpenAside && (
          <IconButton
            onClick={toggleAside}
            Icon={SlidersHorizontal}
            size={17}
          />
        )}
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
      </div>

      <IconButton
        className="md:hidden text-blue-500"
        onPress={onOpenCreate}
        Icon={SquarePen}
      />
      <Button
        className="hidden md:flex"
        onPress={onOpenCreate}
        startContent={<SquarePen size={20} />}
        color="primary"
      >
        wirte prompt
      </Button>
    </div>
  );
};

export default PromptHeader;
function onClear(): void {
  throw new Error("Function not implemented.");
}
