import { convertImageToBaseFromUrl, removeFile } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import technologiesContainer from "@/lib/technolgie_container";
import mediaController from "@/lib/controller/media_controller";

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

    return NextResponse.json({ media });
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
