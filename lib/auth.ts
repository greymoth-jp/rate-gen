import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { magicLink, oneTap } from 'better-auth/plugins';
import { render } from '@react-email/components';
import { Resend } from 'resend';
import { getDb } from './db/client';
import { MagicLinkEmail } from '@/components/emails/MagicLinkEmail';

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.warn(`[auth] ${key} is not set — provider will be unavailable until configured`);
    return '';
  }
  return value;
}

function optionalEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.warn(`[auth] ${key} is not set — provider will be unavailable`);
    return '';
  }
  return value;
}

export const auth = betterAuth({
  secret: requireEnv('BETTER_AUTH_SECRET'),
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3025',
  database: drizzleAdapter(getDb(), { provider: 'sqlite' }),
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const apiKey = requireEnv('RESEND_API_KEY');
        if (!apiKey) {
          console.warn(`[auth] Magic link URL for ${email}: ${url}`);
          return;
        }
        const resend = new Resend(apiKey);
        const html = await render(MagicLinkEmail({ url }));
        await resend.emails.send({
          from: 'RateGen <noreply@rategen.dev>',
          to: email,
          subject: 'RateGen へのサインインリンク',
          html,
        });
      },
    }),
    oneTap(),
  ],
  socialProviders: {
    ...(process.env.APPLE_CLIENT_ID
      ? {
          apple: {
            clientId: optionalEnv('APPLE_CLIENT_ID'),
            teamId: optionalEnv('APPLE_TEAM_ID'),
            keyId: optionalEnv('APPLE_KEY_ID'),
            privateKey: optionalEnv('APPLE_PRIVATE_KEY'),
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID
      ? {
          github: {
            clientId: requireEnv('GITHUB_CLIENT_ID'),
            clientSecret: requireEnv('GITHUB_CLIENT_SECRET'),
          },
        }
      : {}),
    ...(process.env.GOOGLE_CLIENT_ID
      ? {
          google: {
            clientId: requireEnv('GOOGLE_CLIENT_ID'),
            clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
          },
        }
      : {}),
  },
});
