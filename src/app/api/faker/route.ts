import prismaConfig from "@/lib/configs/prismaConfig";

import { NextRequest, NextResponse } from "next/server";

import { getAuthSession } from "@/lib/configs/nextAuthOption";
import { faker } from "@faker-js/faker";
export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const userId = session?.user.id;
    for (let index = 0; index < 50; index++) {
      await prismaConfig.prompt.create({
        data: {
          content: faker.lorem.paragraphs({ min: 2, max: 4 }),
          excerpt: faker.lorem.lines({ min: 2, max: 3 }),
          title: faker.lorem.word({ length: 60 }),
          userId,
          technologyId: faker.number.int({ min: 1, max: 5 }),
        },
      });
    }
    return NextResponse.json("ok");
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
