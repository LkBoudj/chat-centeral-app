import { convertImageToBaseFromUrl } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import technologiesContainer from "@/lib/technolgie_container";

export async function GET(req: NextRequest) {
  try {
    const mp3 = await technologiesContainer.genrateVioce();
    return NextResponse.json(mp3);
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
