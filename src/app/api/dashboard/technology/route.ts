import prismaConfig from "@/lib/configs/prismaConfig";
import { isFileExists, removeFileIfEexits, uploadFiles } from "@/lib/helper";
import { schemCreateTechBack } from "@/lib/validation/technology_validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const techs = await prismaConfig.technology.findMany();
    return NextResponse.json(
      {
        success: true,
        items: techs,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const validation = await schemCreateTechBack.safeParseAsync(data);

    if (!validation.success) {
      const result = {
        success: false,
        errors: validation.error.issues,
      };
      return NextResponse.json(result, { status: 400 });
    }

    const tech = await prismaConfig.technology.create({
      data: {
        ...validation.data,
        refTech: validation.data.refTech.trim().replace(" ", "_"),
      },
    });
    return NextResponse.json({ item: tech, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    let isExist = await prismaConfig.technology.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isExist) {
      const result = {
        success: false,
        errors: [],
      };
      return NextResponse.json(result, { status: 400 });
    }
    const schemCreateTechFrontUpdate = schemCreateTechBack.merge(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, {
            message: "Can't be empty!",
          })
          .refine(
            async (data) => {
              const tech = await prismaConfig.technology.findUnique({
                where: {
                  name: data,
                  NOT: {
                    id: isExist.id,
                  },
                },
              });
              return !tech;
            },
            {
              message: "the name of technology exists",
            }
          ),
        refTech: z
          .string()
          .trim()
          .refine(
            async (data) => {
              //if (data == "") return true;
              const tech = await prismaConfig.technology.findUnique({
                where: {
                  refTech: data,
                  NOT: {
                    id: isExist.id,
                  },
                },
              });
              return !tech;
            },
            {
              message: "The Ref technology exists",
            }
          ),
      })
    );
    const validation = await schemCreateTechFrontUpdate.safeParseAsync(data);

    if (!validation.success) {
      const result = {
        success: false,
        errors: validation.error.issues,
      };
      return NextResponse.json(result, { status: 400 });
    }

    const tech = await prismaConfig.technology.update({
      data: {
        models: validation.data.models,
        name: validation.data.name,
        refTech: validation.data.refTech.trim().replace(" ", "_"),
        logo: validation.data.logo,
        status: validation.data.status,
      },
      where: {
        id: data.id,
      },
    });

    return NextResponse.json({ item: tech, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const isDeleted = await prismaConfig.technology.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}
