import prismaConfig from "@/lib/configs/prismaConfig";

import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { faker } from "@faker-js/faker";
export async function GET(req: NextRequest) {
  try {
    const tags =
      "AI, Machine Learning, Blockchain, Virtual Reality, Augmented Reality, Cybersecurity, Quantum Computing, Cloud Computing, IoT (Internet of Things), Big Data, Robotics, Automation, 5G Technology, Edge Computing, Software Development, Coding Languages, Web Development, Mobile App Development, AR/VR Development, Game Development, Ethical Hacking, Data Science, Data Analysis, UI/UX Design, Graphic Design, Digital Marketing, SEO, Content Creation, Social Media Management, E-commerce, Tech Startups, Innovation Management, Project Management, Agile Methodologies, DevOps, Networking, Computer Hardware, Open Source Projects, Cryptocurrency, NFTs, Smart Home Technology, Wearable Tech, Space Technology, Environmental Tech, Biotechnology, HealthTech, Educational Tech, FinTech, LegalTech, AgriTech, AI in Healthcare, AI in Education, AI in Finance,Digital Commerce, Online Advertising, Branding Strategies, Social Media Analytics, Content Management Systems (CMS), Search Engine Marketing (SEM), Affiliate Marketing, Influencer Marketing, Email Marketing, Mobile Marketing, Video Marketing, User Experience (UX) Research, Interaction Design, Product Design, Animation, 3D Modeling, Graphic Illustration, Brand Identity Design, Packaging Design, Web Usability, A/B Testing, User-Centered Design, Design Thinking, Creative Coding, Digital Art, Game Mechanics, Interactive Storytelling, Game AI";

    // tags.split(",").forEach(async function (tag) {
    //   const tagsP = await prismaConfig.tag.create({
    //     data: {
    //       name: tag.trim(),
    //     },
    //   });
    // });

    const session = await getAuthSession();
    const userId = session?.user.id;
    for (let index = 0; index < 50; index++) {
      const id = faker.number.int({ min: 1, max: 25 });
      await prismaConfig.prompt.create({
        data: {
          content: faker.lorem.paragraphs({ min: 2, max: 4 }),
          excerpt: faker.lorem.lines({ min: 2, max: 3 }),
          title: faker.lorem.word({ length: 60 }),
          userId,
          technologyId: faker.number.int({ min: 1, max: 5 }),
          tags: tags.split(",")[id] ?? "test",
        },
      });
    }
    return NextResponse.json("ok");
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
