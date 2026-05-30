import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createCheckoutSession, getCustomerPortal } from '@/lib/stripe';
import { getDb } from '@/lib/db/client';
import { userSettings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { plan?: string; portal?: boolean };
  const userId = session.user.id;
  const userEmail = session.user.email;
  const baseUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3025';

  const db = getDb();
  const [settings] = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, userId));

  // Customer portal redirect
  if (body.portal === true) {
    if (!settings?.stripeCustomerId) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 });
    }
    const portalSession = await getCustomerPortal({
      stripeCustomerId: settings.stripeCustomerId,
      returnUrl: `${baseUrl}/settings`,
    });
    return NextResponse.json({ url: portalSession.url });
  }

  const plan = body.plan as 'pro_monthly' | 'pro_annual' | 'founding';
  if (!['pro_monthly', 'pro_annual', 'founding'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const checkoutSession = await createCheckoutSession({
    userId,
    userEmail,
    plan,
    stripeCustomerId: settings?.stripeCustomerId ?? null,
    successUrl: `${baseUrl}/settings?checkout=success`,
    cancelUrl: `${baseUrl}/pricing`,
    isFounding: plan === 'founding',
  });

  return NextResponse.json({ url: checkoutSession.url });
}
