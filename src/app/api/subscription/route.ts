import { Success } from "@/components/sections";
import { getAuthSession } from "@/lib/configs/nextAuthOption";
import {
  createStripeSession,
  getAllProducts,
} from "@/lib/handel_stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products: any = await getAllProducts({ active: true });

    const items = products.data.map((item: any) => ({
      type: item.name,
      price: item.metadata.price,
      subscription: "month",
      description: item.description,
      buttonText: "Choose " + item.name,
      options: item.features ?? [],
      active: item.metadata?.active == "active",
      priceId: item.default_price,
      messagesMax: item.metadata?.messagesMax,
      id: item.id,
    }));
    return NextResponse.json(
      {
        success: true,
        items,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
      items: [],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const auth = await session?.user;
    if (!auth)
      return NextResponse.json(
        {
          success: true,
          error: "authantication errors",
          items: [],
        },
        { status: 400 }
      );
    const { priceId, productId, messagesMax } = await req.json();

    const subscription = await createStripeSession({
      succesPage: "http://localhost:3000/subscription",
      userId: auth.id,
      priceId,
      messagesMax,
      customer: auth.stripeCustomerId,
    });

    return NextResponse.json(
      {
        success: true,
        url: subscription.url,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}
