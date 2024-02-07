import { convertImageToBaseFromUrl, removeFile } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import technologiesContainer from "@/lib/technolgie_container";
import mediaController from "@/lib/controller/media_controller";
import { tree } from "next/dist/build/templates/app-page";

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
