import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const media = await prisma.message.findMany({
      include: {
        media: {
          include: {
            medias: true,
          },
        },
      },
    });

    return NextResponse.json(media);
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
