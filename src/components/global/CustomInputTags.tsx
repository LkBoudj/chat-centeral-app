import { cn } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import IconButton from "./IconButton";

type Props = {
  onChange: (k: any) => void;
  error?: any;
  value?: any;
  name?: any;
  data?: string[];
};

const Tag = ({
  value,
  removeTags,
}: {
  removeTags?: (key: any) => void;
  value: string;
}) => {
  return (
    <div
      onClick={removeTags}
      className="bg-[#ebebeb] cursor-pointer flex items-center px-3 py-1 rounded-xl space-x-2 text-sm"
    >
      <span>{value}</span>
      <X size={17} className=" bg-[#929292] rounded-full text-white" />
    </div>
  );
};

const CustomInputTags = ({
  data = [],
  onChange,
  value,
  error,
  name,
}: Props) => {
  const [filterValue, setValue] = useState("");
  const [isListShow, setIsListShow] = useState(false);

  const handelRemoveTags = (tag: string) => {
    onChange(value.filter((t: any) => t != tag));
  };

  const handelKeyDown = (e: any) => {
    if (e.keyCode == 32 && filterValue.trim() != "") {
      addTag(filterValue.trim());
    }
  };

  const addToTgas = (myTag: string) => () => {
    if (myTag != "") {
      addTag(myTag);
    }
  };

  const addTag = (tag: string) => {
    setValue("");
    value.push(tag);
    const setData: any = new Set(value); // This ensures all tags are unique
    onChange([...setData]);
  };

  const handelChange = (e: any) => {
    setValue(e.target.value);
  };

  const rendureList = useMemo(() => {
    const allData = data
      .sort()
      .filter((tag) =>
        tag.toLowerCase().includes(filterValue.trim().toLowerCase())
      );

    return allData.map((tag) => {
      return (
        <li
          key={tag}
          onClick={() => addToTgas(tag)}
          className="px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg"
        >
          {tag}
        </li>
      );
    });
  }, [filterValue, addToTgas, data]);

  return (
    <div
      onBlur={() => setTimeout(() => setIsListShow(false), 200)}
      className={cn(
        `border-2 min-h-[200px] z-50 border-${
          error?.message ? "red" : "gray"
        }-500 p-3 space-y-2 rounded`
      )}
    >
      <h3
        className={cn(`text-xs text-${error?.message ? "red" : "slate"}-600`)}
      >
        Tags
      </h3>
      <div className="relative w-full">
        <div className="flex flex-wrap items-center gap-1 overflow-hidden">
          <div className="flex items-center flex-wrap">
            {[...value].map((tag: any) => (
              <Tag
                key={tag}
                value={tag}
                removeTags={() => handelRemoveTags(tag)}
              />
            ))}
          </div>

          <input
            name={name}
            onFocus={() => setIsListShow(true)}
            onKeyDown={handelKeyDown}
            value={filterValue}
            onChange={handelChange}
            placeholder="Choose your Tags"
            className="outline-none"
          />
          <IconButton
            onClick={() => addTag(filterValue.trim())}
            className="inline-block lg:hidden "
            Icon={Plus}
          />
        </div>
        {isListShow && data && (
          <ul className="absolute left-0 max-h-[200px] overflow-y-auto mt-5 z-[999999999] bg-white w-full shadow-lg border border-slate-700">
            {rendureList}
          </ul>
        )}
      </div>
      {error?.message && (
        <p className="text-xs text-red-500">{error?.message ?? ""}</p>
      )}
    </div>
  );
};

export default CustomInputTags;
