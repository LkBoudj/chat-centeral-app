import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import stripe from "@/lib/handel_stripe/stripe";
import prismaConfig from "@/lib/configs/prismaConfig";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_3cc4e2bf9c897901421f285a2e631566afc600d6644e201fe179377c5e83a099";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = (await request.headers.get("stripe-signature")) ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(null, { status: 200 });
  }

  const session = (await event.data.object) as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) return new Response(null, { status: 200 });

  const user = await prismaConfig.user.findUnique({
    where: {
      id: session?.metadata?.userId,
    },
  });
  if (!user) return new Response(null, { status: 200 });

  if (event.type === "product.updated") {
    const product = event.data.object;

    const paln = await prismaConfig.plan.update({
      data: {
        title: product.name,
        status: product.active,
      },
      where: {
        scriptProductId: product.id,
      },
    });
    // your code to update product in your database goes here
    // for this example, we are just updating our productTable object
  }
  if (event.type === "price.updated") {
    const price = event.data.object;
    const paln = await prismaConfig.plan.update({
      data: {
        price: price.unit_amount as number,
      },
      where: {
        scriptPricetId: price.id,
      },
    });
    // your code to update product in your database goes here
    // for this example, we are just updating our productTable object
  }
  if (event.type === "product.deleted") {
    const product = event.data.object;
    const paln = await prismaConfig.plan.delete({
      where: {
        scriptProductId: product.id,
      },
    });
    // your code to update product in your database goes here
    // for this example, we are just updating our productTable object
  }
  if (event.type == "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prismaConfig.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        msgCounter: 0,
        messagesMax: parseInt(session.metadata.messagesMax),
        SubscriptionExpirydate: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });

    // ... handle other event types
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    await prismaConfig.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        messagesMax: session.metadata.messagesMax as unknown as number,
        msgCounter: 0,
        SubscriptionExpirydate: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type == "customer.subscription.updated") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    await prismaConfig.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        msgCounter: 0,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        messagesMax: session.metadata.messagesMax as unknown as number,
        SubscriptionExpirydate: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return NextResponse.json({ data: "evenet" });
}
