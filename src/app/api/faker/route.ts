import prismaConfig from "@/lib/configs/prismaConfig";
import { NextRequest, NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export async function GET(req: NextRequest) {
  const chats = [...Array(5)].map((_) => ({
    title: faker.lorem.text(),
    slug: faker.lorem.slug(),
    userId: 1,
  }));

  const data = await prismaConfig.conversation.createMany({
    data: chats,
  });

  return NextResponse.json(data);
}
