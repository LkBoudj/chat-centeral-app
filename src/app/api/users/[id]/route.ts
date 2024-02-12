import prismaConfig from "@/lib/configs/prismaConfig";
import { userController } from "@/lib/controller";
import { schemaUser } from "@/lib/validation/user_validation";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, { params: { id } }: any) {
  try {
    const user = await userController.isExits({ id });

    if (user) {
      return NextResponse.json(
        {
          success: true,
          data: user,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: false }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function POST(req: NextRequest, { params: { id } }: any) {
  try {
    const user = await userController.isExits({ id });
    const response: any = {
      data: null,
      success: false,
      error: null,
    };
    if (user) {
      const json = await req.json();
      const schema: any = schemaUser.merge(
        z.object({
          email: z
            .string()
            .email()
            .refine(async (data) => {
              const isExits = await prismaConfig.user.findUnique({
                where: {
                  email: data,
                  NOT: {
                    id,
                  },
                },
              });
              return !isExits;
            }, "choose other email"),
        })
      );

      const validation = await schema.safeParseAsync(json);

      if (!validation.success) {
        response.error = validation.error.issues;
        return NextResponse.json(response, { status: 400 });
      }

      const updatedUser = await prismaConfig.user.update({
        data: validation.data,
        where: {
          id,
        },
      });
      response.success = true;
      response.data = updatedUser;

      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json(response, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params: { id } }: any) {
  try {
    const user = await userController.isExits({ id });
    const response: any = {
      data: null,
      success: false,
      error: null,
    };

    if (user) {
      const json = await req.json();
      const schema: any = z.object({
        image: z.string(),
      });

      const validation = await schema.safeParseAsync(json);

      if (!validation.success) {
        response.error = validation.error.issues;
        return NextResponse.json(response, { status: 400 });
      }

      const updatedUser = await prismaConfig.user.update({
        data: validation.data,
        where: {
          id,
        },
      });
      response.success = true;
      response.data = updatedUser;

      return NextResponse.json(response, { status: 200 });
    }

    return NextResponse.json(response, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(e, { status: 400 });
  }
}
