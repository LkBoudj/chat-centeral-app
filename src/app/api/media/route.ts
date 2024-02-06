import { getAuthSession } from "@/lib/configs/nextAuthOption";
import mediaController from "@/lib/controller/media_controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = await req.nextUrl.searchParams;
    const type: string = searchParams.get("type") as string;

    const session = await getAuthSession();
    const userId = session?.user.id;
    const media = await mediaController.findMany({
      userId,
      type,
    });

    return NextResponse.json(media, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 200 });
  }
}
