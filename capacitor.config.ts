import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.rategen.app',
  appName: 'RateGen',
  webDir: 'out',
  // iOS: Mac 必須のため skip
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    },
  },
  server: {
    // Dev: point to Next.js server for live reload
    url: process.env.NODE_ENV === 'development' ? 'http://10.0.2.2:3025' : undefined,
    cleartext: true,
  },
};

export default config;
