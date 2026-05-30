'server only';
import Stripe from 'stripe';
import { PRICING } from '@/lib/pricing-constants';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    if (process.env.NODE_ENV === 'production') throw new Error('STRIPE_SECRET_KEY is not set');
    console.warn('[stripe] STRIPE_SECRET_KEY is not set — Stripe calls will fail');
    return new Stripe('sk_test_placeholder', { apiVersion: '2025-02-24.acacia' });
  }
  return new Stripe(key, { apiVersion: '2025-02-24.acacia' });
}

function requirePrice(key: string): string {
  const v = process.env[key];
  if (!v) {
    console.warn(`[stripe] ${key} is not set`);
    return '';
  }
  return v;
}

export const PRICES = {
  proMonthly: () => requirePrice('STRIPE_PRICE_PRO_MONTHLY'),
  proAnnual: () => requirePrice('STRIPE_PRICE_PRO_ANNUAL'),
  founding: () => requirePrice('STRIPE_PRICE_FOUNDING_ANNUAL'),
} as const;

export type CreateCheckoutSessionParams = {
  userId: string;
  userEmail: string;
  plan: 'pro_monthly' | 'pro_annual' | 'founding';
  stripeCustomerId?: string | null;
  successUrl: string;
  cancelUrl: string;
  isFounding?: boolean;
};

export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();

  const useFoundingPrice = params.plan === 'founding' && params.isFounding === true;

  const priceId =
    params.plan === 'pro_monthly'
      ? PRICES.proMonthly()
      : useFoundingPrice
        ? PRICES.founding()
        : PRICES.proAnnual();

  const isSubscription = true; // all plans are subscriptions

  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: params.stripeCustomerId ?? undefined,
    customer_email: params.stripeCustomerId ? undefined : params.userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { userId: params.userId, plan: params.plan },
    subscription_data: {
      metadata: {
        userId: params.userId,
        plan: params.plan,
        ...(useFoundingPrice ? { founding_grandfathered: 'true' } : {}),
      },
      // 特定商取引法 2022/6 改正対応 — 自動継続表示
      description:
        params.plan === 'pro_annual' || useFoundingPrice
          ? `RateGen Pro 年払い ¥${useFoundingPrice ? PRICING.founding.toLocaleString() : PRICING.annual.toLocaleString()}/年（自動継続）。解約しない限り毎年継続課金されます。Settings からいつでも解約可能。`
          : `RateGen Pro 月払い ¥${PRICING.monthly.toLocaleString()}/月（自動継続）。解約しない限り毎月継続課金されます。Settings からいつでも解約可能。`,
    },
    custom_text: {
      submit: {
        message:
          `ご注文内容を確認の上、お申込みください。本プランは自動継続契約です。Settings からいつでも解約可能。解約後の残期間は払い戻し対象外。`,
      },
    },
  });
}

export async function getCustomerPortal(params: {
  stripeCustomerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  const stripe = getStripe();
  return stripe.billingPortal.sessions.create({
    customer: params.stripeCustomerId,
    return_url: params.returnUrl,
  });
}

export function constructWebhookEvent(
  rawBody: string,
  signature: string,
  secret: string
): Stripe.Event {
  return getStripe().webhooks.constructEvent(rawBody, signature, secret);
}
