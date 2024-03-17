import Stripe from "stripe";

//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SCRET_KEY_TEST, {
  apiVersion: "2023-10-16", // Use the latest API version
});

export const getAllProducts = async (option?: any) => {
  const products = await stripe.products.list(option);
  return products;
};

export const createProdect = async ({
  name,
  description,
  currency = "usd",
  unit_amount,
  metadata,
  features,
}: ProductPromps) => {
  const product = await stripe.products.create({
    name,
    description,
    default_price_data: {
      currency: "",
      unit_amount: unit_amount,
    },
    metadata,
    features,
  });

  return product;
};

export const updateProdect = async ({
  id,
  name,
  description,
  default_price,
  metadata,
  features,
}: UpdateProductPromps) => {
  const product = await stripe.products.update(id, {
    name,
    description,
    default_price,
    metadata,
    features,
  });

  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await stripe.products.del(id);

  return product;
};

export const createPriceOfProduct = async ({
  nickname,
  product,
  currency = "usd",
  unit_amount,
  usage_type = "licensed",
  interval = "month",
}: PriceOfProductPromps) => {
  const price = await stripe.prices.create({
    nickname,
    currency,
    product,
    unit_amount,
    recurring: {
      interval,
      usage_type,
    },
    product_data: {
      name: nickname,
    },
  });
  return price;
};

export const updatePriceOfProduct = async ({
  id,
  nickname,
  unit_amount,
  active,
}: UpdatePriceOfProductPromps) => {
  const price = await stripe.prices.update(id, {
    active,
    nickname,
  });
  return price;
};

export const customeUpdateProductAndDefaultPrice = async ({
  priceId,
  productId,
  description,
  name,
  price,
}: {
  priceId: string;
  productId: string;
  description?: string;
  name: string;
  price: number;
}) => {
  // const updatedPrice: any = await updatePriceOfProduct({
  //   id: priceId,
  //   nickname: name,
  //   unit_amount: price,
  // });
  const updatedPoduct = await updateProdect({
    id: productId,
    name,
    description,
  });

  return { product: updatedPoduct.id };
};
export const searchPricesOfProduct = async ({ id }: { id: string }) => {
  const productPrice = await stripe.prices.search({
    query: `product:"${id}"`,
  });
  return productPrice;
};

export const createCustomer = async ({
  email,
  name,
  description,
}: CustomertPromps) => {
  const customer = await stripe.customers.create({
    email,
    name,
    description,
  });

  return customer;
};

export const createStripeSession = async ({
  succesPage,
  cancelPage,
  priceId,
  email,
  messagesMax,
  userId,
  customer,
}: SubscriptionPrompt) => {
  const subscriptin: any = await stripe.checkout.sessions.create({
    success_url: succesPage ?? "http://localhost:3000/success",
    cancel_url: cancelPage ?? "http://localhost:3000/cancel",
    customer_email: email,
    customer,
    payment_method_types: ["card"],
    metadata: {
      userId,
      messagesMax,
    },
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
  });

  return subscriptin;
};
export default stripe;
