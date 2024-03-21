import { FileTypeNotAbodedError } from "@/lib/configs/custom_errors_thorw";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import mediaController from "@/lib/controller/media_controller";
import { uploadFileMedia, uploadMultiFileMedia } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";

async function handleResponse(
  success: boolean,
  data: any,
  errors: any,
  status = 200
) {
  return NextResponse.json({ success, data, errors }, { status: 200 });
}

async function handleError(e: any) {
  return handleResponse(false, null, e, 400);
}

export async function POST(req: Request) {
  try {
    const filesData = await req.formData();
    const files = filesData.getAll("files") as unknown as File[];

    const session = await getAuthSession();
    const { id } = session?.user;

    if (id) {
      const data = await uploadMultiFileMedia(files, id);
      const medias = await mediaController.createMny(data);
      return handleResponse(true, medias, null);
    }

    return handleResponse(false, null, "Your are not login");
  } catch (e: any) {
    if (e instanceof FileTypeNotAbodedError) {
      return handleResponse(false, null, e.message.toString());
    }
    return handleError(e);
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = await req.nextUrl.searchParams;
    const type: string = searchParams.get("type") as string;

    const session = await getAuthSession();
    const userId = session?.user.id;

    const medias = await mediaController.findMany({ userId, type });

    return handleResponse(true, medias, "");
  } catch (e) {
    return handleError(e);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const session = await getAuthSession();
    const userId = session?.user.id;

    const data = await mediaController.delete({ userId, id });

    return handleResponse(true, data, "");
  } catch (e) {
    if (e instanceof FileTypeNotAbodedError) {
      return handleResponse(false, null, e.message.toString());
    }
    return handleError(e);
  }
}
