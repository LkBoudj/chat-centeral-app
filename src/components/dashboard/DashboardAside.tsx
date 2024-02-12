"use client";
import { Link, Listbox, ListboxItem, cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";

type Props = {
  dashNavigation: NavItem[];
};

const DashboardAside = ({ dashNavigation }: Props) => {
  const pathName = usePathname();
  return (
    <div className=" p-4 w-full max-w-[250px]">
      <Listbox
        as={"aside"}
        aria-label="User Menu"
        className="w-ful"
        itemClasses={{
          base: " px-3 ",
        }}
      >
        {dashNavigation?.map((item) => (
          <ListboxItem
            as={Link}
            key={item.name}
            href={item.path}
            className={cn(
              `text-black font-bold`,
              pathName == item.path && "bg-blue-500 text-white"
            )}
            startContent={<item.Icon size={13} />}
          >
            {item.name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default DashboardAside;
