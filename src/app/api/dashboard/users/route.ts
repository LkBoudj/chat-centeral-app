import prismaConfig from "@/lib/configs/prismaConfig";
import { userController } from "@/lib/controller";
import { schemaCreateUserBack } from "@/lib/validation/user_validation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const users = await prismaConfig.user.findMany();
    return NextResponse.json(
      {
        success: true,
        items: users,
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

    const validation = await schemaCreateUserBack.safeParseAsync(data);

    if (!validation.success) {
      const result = {
        success: false,
        errors: validation.error.issues,
      };
      return NextResponse.json(result, { status: 400 });
    }

    const user = await prismaConfig.user.create({
      data: {
        ...validation.data,
        messagesMax: validation.data.messagesMax as number,
      },
    });
    return NextResponse.json({ items: user, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();

    const isExsits = await userController.isExits({ id: data.id });

    if (!isExsits) {
      const result = {
        success: false,
        errors: [],
      };
      return NextResponse.json(result, { status: 400 });
    }
    const scschemaEditUserBack = schemaCreateUserBack.merge(
      z.object({
        email: z
          .string()
          .email()
          .refine(
            async (email) => {
              const userisExsits = await prismaConfig.user.findUnique({
                where: {
                  NOT: {
                    id: isExsits.id,
                  },
                  email,
                },
              });
              return !userisExsits;
            },
            { message: "choose other email" }
          ),
      })
    );
    const validation = await scschemaEditUserBack.safeParseAsync(data);

    if (!validation.success) {
      const result = {
        success: false,
        errors: validation.error.issues,
      };
      return NextResponse.json(result, { status: 400 });
    }

    const updatedUser = await prismaConfig.user.update({
      data: {
        ...validation.data,
        messagesMax: validation.data.messagesMax as number,
      },
      where: {
        id: isExsits.id,
      },
    });
    return NextResponse.json(
      { item: updatedUser, success: true },
      { status: 200 }
    );
  } catch (e: any) {
    console.log("errrrrrrr=>", e);

    return NextResponse.json(e, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const isDeleted = await prismaConfig.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}
