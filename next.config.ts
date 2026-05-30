import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prevent Next.js from bundling server-only packages that use native bindings
  serverExternalPackages: [
    'better-auth',
    '@better-auth/core',
    '@better-auth/drizzle-adapter',
    '@better-auth/kysely-adapter',
    '@libsql/client',
    'drizzle-orm',
    'kysely',
  ],
};

export default nextConfig;
