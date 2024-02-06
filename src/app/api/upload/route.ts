import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prismaConfig from "@/lib/configs/prismaConfig";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import mediaController from "@/lib/controller/media_controller";
import { uploadFiles } from "@/lib/helper";

export async function POST(req: Request) {
  try {
    const filesData = await req.formData();
    const files = filesData.get("files") as unknown as File;

    const session = await getAuthSession();
    const auth = session?.user;
    const fileData = await uploadFiles(files);

    const media = await mediaController.create({
      userId: auth.id,
      src: fileData?.src as string,
      type: `image/${fileData?.type}` as string,
    });

    return NextResponse.json({ success: true, media });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}
