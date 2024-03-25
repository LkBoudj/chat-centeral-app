import { Avatar } from "@nextui-org/react";
import IconButton from "./IconButton";
import { Edit } from "lucide-react";

const CustomAvatarUser = ({
  name,
  description,
  src,
  email,
  showDetails = true,
  onClick,
  canEdit,
  defaultSrc,
}: {
  name: string;
  defaultSrc?: string;
  description?: string;
  email?: string;
  src?: string;
  showDetails?: boolean;
  onClick?: () => void;
  canEdit?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative group overflow-hidden">
        <Avatar
          className="  w-44 h-44"
          name={name}
          src={src != "" ? src : defaultSrc}
        />
        {canEdit && (
          <IconButton
            className=" transition-all transform scale-0 group-hover:scale-100  duration-150 opacity-0  group-hover:opacity-100 absolute z-50 right-5 bottom-5"
            Icon={Edit}
            onClick={onClick}
          />
        )}
      </div>
      {showDetails && (
        <div className=" flex flex-col text-center items-center justify-center space-y-2 pl-2 max-w-md">
          <p className="font-bold text-xl text-slate-800 ">{name}</p>
          {email && (
            <p className=" text-sm font-medium text-slate-600">{email}</p>
          )}
          {description && (
            <p className=" text-sn font-medium text-slate-600">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomAvatarUser;
