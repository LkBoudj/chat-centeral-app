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
    const formDate = await req.formData();
    const logo: File | null = formDate.get("logo") as File;
    const name: string = formDate.get("name") as string;
    const refTech: string = formDate.get("refTech") as string;
    const models: string = formDate.get("models") as string;
    const status: string = formDate.get("status") as string;

    const validation = await schemCreateTechBack.safeParseAsync({
      logo,
      name,
      refTech,
      models,
      status,
    });

    if (!validation.success) {
      const result = {
        success: false,
        errors: validation.error.issues,
      };
      return NextResponse.json(result, { status: 400 });
    }
    let logoFile: any = null;
    if (logo) {
      logoFile = await uploadFiles(logo, "images/technologies", "tech");
    }

    const tech = await prismaConfig.technology.create({
      data: {
        ...validation.data,
        refTech: validation.data.refTech.trim().replace(" ", "_"),
        logo: logoFile?.src ?? null,
      },
    });
    return NextResponse.json({ items: tech, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const formDate = await req.formData();
    const logo: File | null = formDate.get("logo") as File;
    const id: string = formDate.get("id") as string;
    const name: string = formDate.get("name") as string;
    const refTech: string = formDate.get("refTech") as string;
    const models: string = formDate.get("models") as string;
    const status: string = formDate.get("status") as string;

    let techItem: any = null;

    const schemCreateTechFrontUpdate = schemCreateTechBack.merge(
      z.object({
        id: z
          .string()
          .min(1, "id is required")
          .refine(async (data) => {
            techItem = await prismaConfig.technology.findUnique({
              where: {
                id: parseInt(id),
              },
            });
            if (techItem) return true;
            return false;
          }),
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
                    id: parseInt(id),
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
                    id: parseInt(id),
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
    const validation = await schemCreateTechFrontUpdate.safeParseAsync({
      id,
      logo,
      name,
      refTech,
      models,
      status,
    });

    if (!validation.success) {
      const result = {
        success: false,
        errors: validation.error.issues,
      };
      return NextResponse.json(result, { status: 400 });
    }
    let logoFile = null;

    if (logo && typeof logo != "string") {
      logoFile = await uploadFiles(logo, "images/technologies", "tech");
      if (techItem && techItem?.logo) {
        removeFileIfEexits("images/technology", techItem?.logo);
      }
    }

    const tech = await prismaConfig.technology.update({
      data: {
        models: validation.data.models,
        name: validation.data.name,
        refTech: validation.data.refTech.trim().replace(" ", "_"),
        logo: logoFile?.src ?? techItem?.logo,
        status: validation.data.status,
      },
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ item: tech, success: true }, { status: 200 });
  } catch (e: any) {
    console.log("errrrrrrr=>", e);

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
