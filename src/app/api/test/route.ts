import { convertImageToBaseFromUrl } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    // const imageFile = path.join(
    //   process.cwd(),
    //   "public",
    //   "media",
    //   "media_1706673830507.jpg"
    // );
    // const openTheFile = fs.readFileSync(imageFile);
    // const base64Image = openTheFile.toString("base64");

    const json = await convertImageToBaseFromUrl("media_1706673830507.jpg");
    return NextResponse.json(json);
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
