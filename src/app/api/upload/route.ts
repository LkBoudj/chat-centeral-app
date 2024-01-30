import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prismaConfig from "@/lib/configs/prismaConfig";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import mediaController from "@/lib/controller/media_controller";

const uploadFiles = async (files: File) => {
  if (files) {
    const blob = files as unknown as Blob;
    const bytes = await blob.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { size, type: t } = blob;
    const type = t.split("/")[1];
    const name = `/media_${Date.now()}.${type}`;
    const src = path.join(process.cwd(), "public/media", name);

    fs.writeFileSync(src, buffer);

    return {
      src,
      type,
    };
  }
};
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
      type: fileData?.type as string,
    });

    return NextResponse.json({ success: true, media });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
}
