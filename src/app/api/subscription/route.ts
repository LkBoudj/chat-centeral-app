import { Success } from "@/components/sections";
import { getAllProducts } from "@/lib/handel_stripe/stripe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products: any = await getAllProducts({ active: true });
    console.log(products);

    const items = products.data.map((item: any) => ({
      type: item.name,
      price: item.metadata.price,
      subscription: "month",
      description: item.description,
      buttonText: "Choose " + item.name,
      options: item.features ?? [],
      active: item.metadata?.active == "active",
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
