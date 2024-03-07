import { LogoIcon } from "@/components";
import MediaLink from "./MediaLink";

const DescriptionCol = ({
  medias,
  description,
}: {
  medias: Array<any>;
  description: string;
}) => {
  return (
    <div className="col-span-12 md:col-span-3 space-y-8">
      <div className="flex items-center space-x-2">
        <LogoIcon className="  fill-white" />
        <p className="font-bold text-inherit ">by Nu Terra Labs</p>
      </div>
      <p className="leading-[2.3em] text-sm max-w-2xl">{description}</p>
      <div className="transform -translate-x-3 pt-5">
        {medias.map((v, i) => (
          <MediaLink key={i} link={v.link} Icon={v.Icon} />
        ))}
      </div>
    </div>
  );
};

export default DescriptionCol;
