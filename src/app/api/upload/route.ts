import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export async function POST(req: Request) {
  try {
    const filesData = await req.formData();
    const files = filesData.get("files") as unknown as File[];

    if (files) {
      const blob = files as unknown as Blob;
      const bytes = await blob.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const { size, type } = blob;

      const name = `/media_${Date.now()}.${type.split("/")[1]}`;
      const filePath = path.join(process.cwd(), "public/media", name);
      console.log(filePath);

      fs.writeFileSync(filePath, buffer);
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ success: false });
    return NextResponse.json(e);
  }
}
