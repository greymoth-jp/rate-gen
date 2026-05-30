import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/stripe';
import { getDb } from '@/lib/db/client';
import { processedWebhooks, userSettings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(rawBody, signature, secret);
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  const db = getDb();

  // Idempotency check
  const existing = await db
    .select()
    .from(processedWebhooks)
    .where(eq(processedWebhooks.id, event.id))
    .get();
  if (existing) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  // Process event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          await db
            .update(userSettings)
            .set({
              plan: plan === 'founding' ? 'pro' : 'pro',
              stripeCustomerId: session.customer as string,
              subscriptionId: session.subscription as string,
              updatedAt: new Date(),
            })
            .where(eq(userSettings.userId, userId));
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;
        if (userId) {
          await db
            .update(userSettings)
            .set({ plan: 'free', subscriptionId: null, updatedAt: new Date() })
            .where(eq(userSettings.userId, userId));
        }
        break;
      }

      case 'invoice.payment_failed': {
        // Log for monitoring, no plan downgrade immediately (grace period)
        console.warn('[webhook] invoice.payment_failed:', event.id);
        break;
      }

      case 'charge.refunded': {
        // Log for manual handling
        console.warn('[webhook] charge.refunded:', event.id);
        break;
      }

      default:
        break;
    }

    // Mark as processed
    await db.insert(processedWebhooks).values({
      id: event.id,
      eventType: event.type,
      processedAt: Math.floor(Date.now() / 1000),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook] Processing error:', err);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
