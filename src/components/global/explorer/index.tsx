import { Tabs, Tab } from "@nextui-org/react";
import MediaFiles from "./MediaFiles";

type Props = {
  handelSelectFile?: (e: any) => void;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  types?: string[];
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onOpen?: () => void;
};

const Explorer = ({
  handelSelectFile,
  types,
  startComponent,
  endComponent,
}: Props) => {
  return (
    <Tabs aria-placeholder="Options">
      {startComponent}

      {types?.map((type) => (
        <Tab
          key={type.toLowerCase()}
          className="h-full  "
          title={type.toUpperCase()}
        >
          <MediaFiles type={type} handelSelectFile={handelSelectFile} />
        </Tab>
      ))}

      {endComponent}
    </Tabs>
  );
};

export default Explorer;
