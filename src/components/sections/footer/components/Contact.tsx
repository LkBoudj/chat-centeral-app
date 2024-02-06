"use cleint";
import Item from "./Item";

const MenuFooterContact = ({ data }: { data: Array<any> }) => {
  return (
    <div className={`flex flex-col items-start  space-y-6 `}>
      {data.map((v, i) => {
        return <Item key={i} Icon={v.Icon} label={v.label} />;
      })}
    </div>
  );
};

export default MenuFooterContact;
