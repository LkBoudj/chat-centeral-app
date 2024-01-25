import prismaConfig from "@/lib/configs/prismaConfig";
import ClsUtils from "@/lib/utils/clsUtils";
import { createCustomer } from "@/lib/utils/handel_stripe/stripe";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    const isExists = await prismaConfig.user.findUnique({
      where: {
        email,
      },
    });

    if (isExists) {
      return NextResponse.json(
        {
          user: null,
          message: "The Email Already Exists",
        },
        { status: 409 }
      );
    }
    const pass = await ClsUtils.hashPassword(password);

    let data: any = {
      name: fullName,
      email,
      password: pass,
      roles: Role.user,
    };

    const customer = await createCustomer({
      name: fullName,
      email,
    });

    if (customer) {
      data.stripeCustomerId = customer.id;
    }
    const user = await prismaConfig.user.create({
      data,
    });

    const { password: newUserPaaword, ...rest } = user;

    return NextResponse.json(
      { user: rest, message: "The user created succefully" },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: "Somthing Went worng" },
      { status: 500 }
    );
  }
}
