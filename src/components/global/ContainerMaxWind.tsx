"use client";
import { cn } from "@/lib/utlis";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const ContainerMaxWind = ({ className, children }: Props) => {
  return (
    <div className={cn("max-w-[1400px] mx-auto ", className)}>{children}</div>
  );
};

export default ContainerMaxWind;
