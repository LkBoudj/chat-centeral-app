import { convertImageToBaseFromUrl, removeFile } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import technologiesContainer from "@/lib/technolgie_container";

export async function POST(req: NextRequest) {
  try {
    const r = await removeFile(
      "images/technologies",
      "tech_1706863997879.jpeg"
    );
    console.log(r);

    return NextResponse.json({ r });
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
