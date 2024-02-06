"use client";
import Item from "./Item";

const MenuFooterService = ({ data }: { data: Array<any> }) => {
  return (
    <ul className={`text-sm  space-y-7`}>
      {data.map((v, i) => {
        return (
          <li key={i}>
            <Item key={i} href={v.href} label={v.label} Icon={v.Icon} />
          </li>
        );
      })}
    </ul>
  );
};

export default MenuFooterService;
