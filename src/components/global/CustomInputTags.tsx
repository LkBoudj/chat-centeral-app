import { cn } from "@nextui-org/react";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  onChange: (k: any) => void;
  error?: any;
  value?: any;
  name?: any;
  data?: string[];
};

const Tag = ({
  value,
  removeTage,
}: {
  removeTage?: (key: any) => void;
  value: string;
}) => {
  return (
    <div
      onClick={removeTage}
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

  const handelRemoveTage = (tag: string) => {
    onChange(value.filter((t: any) => t != tag));
  };

  const handelKeyDown = (e: any) => {
    if (e.keyCode == 32 && filterValue.trim() != "") {
      value.push(filterValue.trim());
      const setData: any = new Set(value);
      onChange([...setData]);
      setValue("");
    }
  };

  const handelChange = (e: any) => {
    setValue(e.target.value);
  };

  const addToTgas = (myTag: string) => {
    if (myTag != "") {
      setValue("");
      value.push(myTag);
      const setData: any = new Set(value);
      onChange([...setData]);
    }
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
  }, [filterValue, value,addToTgas,data,value]);

  return (
    <div
      onBlur={() => setTimeout(() => setIsListShow(false), 200)}
      className={cn(
        `border-2  min-h-[200px] z-50 border-${
          error?.message ? "red" : "gray"
        }-500 p-3 space-y-2 rounded`
      )}
    >
      <h3
        className={cn(`text-xs text-${error?.message ? "red" : "slate"}-600`)}
      >
        Tags{" "}
      </h3>
      <div className="relative w-full">
        <div className="flex flex-wrap items-center gap-2 overflow-hidden">
          {[...value].map((tag: any) => (
            <Tag
              key={tag}
              value={tag}
              removeTage={() => handelRemoveTage(tag)}
            />
          ))}

          <input
            name={name}
            onFocus={() => setIsListShow(true)}
            onKeyDown={handelKeyDown}
            value={filterValue}
            onChange={handelChange}
            placeholder="Choos your Tags"
            className="  outline-none"
          />
        </div>
        {isListShow && data && (
          <ul className=" absolute left-0 max-h-[200px] overflow-y-auto  mt-5 z-[999999999] bg-white w-full shadow-lg border border-slate-700">
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