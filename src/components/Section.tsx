import React, { LegacyRef } from "react";
import { ContainerMaxWind } from ".";

type Props = {
  id?: LegacyRef<HTMLElement>;
  children: React.ReactNode;
  sectionClass?: string;
  containerClass?: string;
};

const Section = ({ id, children, sectionClass, containerClass }: Props) => {
  return (
    <section ref={id} className={sectionClass}>
      <ContainerMaxWind className={` p-5 ${containerClass}`}>
        {children}
      </ContainerMaxWind>
    </section>
  );
};

export default Section;
