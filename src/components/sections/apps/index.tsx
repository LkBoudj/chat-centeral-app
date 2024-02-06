import { Section } from "@/components";
import AppLeft from "./components/AppLeft";
import AppRight from "./components/AppRight";
import { LegacyRef } from "react";

type Props = {
  id?: LegacyRef<HTMLElement>;
};

const Apps = ({ id }: Props) => {
  return (
    <Section
      id={id}
      sectionClass="bg-white pt-36 pb-24 "
      containerClass="flex flex-col lg:flex-row items-center"
    >
      <AppRight src="/images/app.png" />
      <AppLeft
        title="Chat Bot available on mobile & website & Plugin"
        description="Quisque convallis dolor a risus luctus, et tempor massa finibus. In egestas massa et lorem tempor, vel consequat est blandit. Pellentesque suscipit molestie ex eu "
      />
    </Section>
  );
};

export default Apps;
