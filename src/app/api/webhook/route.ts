import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/handel_stripe/stripe";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_3cc4e2bf9c897901421f285a2e631566afc600d6644e201fe179377c5e83a099";

export async function POST(req: NextRequest) {
  try {
    console.log("Starting ........");

    const body = await req.text();
    const sig = (await req.headers.get("stripe-signature")) as string;
    let event;

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    switch (event.type) {
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (e: any) {
    console.log("errors-?????????????????????", e);
    return NextResponse.json(
      {
        success: false,
        error: e.message,
      },
      { status: 400 }
    );
  }
}
