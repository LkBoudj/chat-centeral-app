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
      containerClass="space-y-24 bg-white rounded-3xl py-16"
    >
      <div className="text-center space-y-8 py-24">
        <h4 className="text-[63px] max-w-3xl mx-auto font-bold text-[#blue]">
          Use AI
        </h4>
        <p className="w-full max-w-[780px] leading-[36px] mx-auto font-semibold">
          At ChatCentral, we're passionate about harnessing the power of AI to enhance your work and creativity. Our platform is your hub for the latest AI technologies, offering everything from image generation and text-to-speech conversion to document analysis—all with comprehensive multi-language support. Beyond the tools, our prompt library serves as a dynamic resource to spark your creativity and efficiency. It's not just about the tech; it's about the community and collaboration. Share your insights, explore new ideas, and connect with others through likes, comments, and shared prompts. ChatCentral simplifies and streamlines your workflow, keeping you informed and engaged in one convenient place. Whether for personal projects or professional development, we're here to help you innovate and achieve.</p>

        <Button
          color="primary"
          size="lg"
          className="w-full max-w-md text-[14] font-bold py-2 text-white"
          as={Link}
          href="/register"
        >
          Explore Now
        </Button>
      </div>
    </Section >
  );
}


export default Success;
