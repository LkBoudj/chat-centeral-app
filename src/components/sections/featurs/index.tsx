import { Section } from "@/components";
import Item from "./components/Item";
import { LegacyRef } from "react";

type Props = {
  id?: LegacyRef<HTMLElement>;
};

const Featurs = ({ id }: Props) => {
  return (
    <Section
      id={id}
      sectionClass="bg-white"
      containerClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-16 pb-32"
    >
      <Item
        src="/images/app-development.png"
        title="software solutions"
        description="Nunc posuere risus justo, sit amet dapibus elit lacinia "
      />
      <Item
        src="/images/bullhorn.png"
        title="Instant communication"
        description="Nunc posuere risus justo, sit amet dapibus elit lacinia "
      />
      <Item
        src="/images/support.png"
        title="latest notification"
        description="Nunc posuere risus justo, sit amet dapibus elit lacinia "
      />
    </Section>
  );
};

export default Featurs;
