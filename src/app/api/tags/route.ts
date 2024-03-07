import prismaConfig from "@/lib/configs/prismaConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const tags = await prismaConfig.tag.findMany({
      select: {
        name: true,
      },
    });
    return NextResponse.json({ sucssess: true, data: tags });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
