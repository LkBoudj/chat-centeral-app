interface ProductPromps {
  name: string;
  description?: string;
  unit_amount: number;
  currency?: string;
  images?: string;
  metadata?: any;
  features?: any[];
}

interface UpdateProductPromps {
  id: string;
  default_price?: string;
  name?: string;
  description?: string;
  unit_amount?: number;
  currency?: string;
  images?: string;
  metadata?: any;
  features?: any[];
}

interface CustomertPromps {
  name: string;
  email: string;
  description?: string;
}

interface SubscriptionPrompt {
  succesPage?: string;
  cancelPage?: string;
  priceId: string;
  email?: string;
  userId: number;
  customer?: string;
  messagesMax: number;
}

interface PriceOfProductPromps {
  active?: boolean;
  nickname: string;
  product?: string;
  currency?: string;
  unit_amount: number;
  usage_type?: Stripe.PriceCreateParams.Recurring.UsageType;
  interval?: Stripe.PriceCreateParams.Recurring.Interval;
}

interface UpdatePriceOfProductPromps extends PriceOfProductPromps {
  id: string;
  unit_amount?: number;
  nickname?: string;
}
