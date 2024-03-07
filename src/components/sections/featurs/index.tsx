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
        src="/images/prompt-library.png"
        title="Prompt Library & Community"
        description="Explore and contribute to our rich prompt library. Share your prompts, post insights, comment on discoveries, and save your favorites."
      />
      <Item
        src="/images/support.png"
        title="Image Generation"
        description="Craft stunning visuals with advanced AI, transforming ideas into images effortlessly."
      />
      <Item
        src="/images/support.png"
        title="Image Analysis"
        description="Gain insights from visuals with powerful AI analysis, unlocking new perspectives."
      />
      <Item
        src="/images/support.png"
        title="Speech to Text"
        description="Convert speech to text in real-time, making content creation seamless and efficient."
      />
      <Item
        src="/images/support.png"
        title="Text to Speech"
        description="Bring text to life with natural sounding voices, enhancing accessibility and engagement."
      />
      <Item
        src="/images/support.png"
        title="Document Analysis"
        description="Extract valuable information from documents with AI, streamlining data processing."
      />
      <Item
        src="/images/support.png"
        title="LLM Access"
        description="Access a variety of Large Language Models, customizing solutions to fit your needs."
      />
      <Item
        src="/images/support.png"
        title="Multi-Language Support"
        description="Communicate globally with multi-language capabilities, breaking down language barriers."
      />
    </Section>
  );

};

export default Featurs;
