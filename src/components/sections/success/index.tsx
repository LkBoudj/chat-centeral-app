import { Section } from "@/components";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { LegacyRef } from "react";
type Props = {
  id?: LegacyRef<HTMLElement>;
};

function Success({ id }: Props) {
  return (
    <Section
      id={id}
      sectionClass="bg-white bg-success pt-16 pb-24"
      containerClass=" space-y-24 bg-white rounded-3xl py-16"
    >
      <div className="text-center space-y-8 py-24">
        <h4 className="text-[63px] max-w-3xl mx-auto font-bold text-[#DEEAFF]">
          Success
        </h4>
        <p className="w-full max-w-[668px] leading-[36px] mx-auto font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          tincidunt risus. Vestibulum ante ipsum primis in faucibus orci luctus
          et ultrices posuere cubilia curae; Fusce dolor elit, consequat quis.
        </p>

        <Button
          color="primary"
          size="lg"
          className="w-full max-w-md text-[14] font-bold py-2 text-white"
          as={Link}
          href="/register"
        >
          Get Started
        </Button>
      </div>
    </Section>
  );
}

export default Success;
