import { Button, Input, cn } from "@nextui-org/react";
import { Search, SquarePen } from "lucide-react";

type PromptHeaderProps = {
    setValue: React.Dispatch<React.SetStateAction<string>>, setSearch: (key: any) => void, value: string, onOpen: () => void
  }
  
  const PromptHeader:React.FC<PromptHeaderProps> = ({setValue,setSearch,onOpen,value}) => {
    
    return   <div className={cn("flex items-center justify-between  w-full px-8")}>
    <Input
      onValueChange={setValue}
      onKeyDown={(e) => {
        e.key == "Enter" && setSearch(value);
      } }
      onClear={() => {
        setValue("");
        setSearch("");
      } }
      value={value}
      startContent={<Search />}
      className="max-w-md"
      placeholder="search ..." />
    <Button onPress={onOpen} startContent={<SquarePen />} color="primary">
      wirte prompt
    </Button>
  </div>;
  }

  export default PromptHeader;