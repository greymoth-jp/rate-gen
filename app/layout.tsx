import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'RateGen â€” é©æ­£å˜ä¾¡ã‚’3ç§’ã§ã€‚ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³•å¯¾å¿œã®å¥‘ç´„æ›¸ã‚’1ã‚¯ãƒªãƒƒã‚¯ã§ã€‚',
  description:
    'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹457ä¸‡äººã®ã€Œé©æ­£å˜ä¾¡ãŒã‚ã‹ã‚‰ãªã„ã€ã€Œå¥‘ç´„æ›¸ãŒä½œã‚Œãªã„ã€ã‚’3åˆ†ã§è§£æ±ºã€‚ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³•2026å¹´11æœˆæ–½è¡Œå¯¾å¿œã®å˜ä¾¡è¨ˆç®—ï¼‹å¥‘ç´„æ›¸PDFç”ŸæˆSaaSã€‚',
  metadataBase: new URL('https://rategen.dev'),
  applicationName: 'RateGen',
  authors: [{ name: 'greymoth-jp' }],
  keywords: [
    'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ é©æ­£å˜ä¾¡',
    'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³• å¥‘ç´„æ›¸',
    'æ¥­å‹™å§”è¨—å¥‘ç´„æ›¸ ãƒ†ãƒ³ãƒ—ãƒ¬ãƒ¼ãƒˆ',
    'å˜ä¾¡è¨ˆç®—',
    'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ å¥‘ç´„æ›¸ PDF',
    '2026 ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹æ–°æ³•å¯¾å¿œ',
  ],
  openGraph: {
    title: 'RateGen â€” é©æ­£å˜ä¾¡ã‚’3ç§’ã§',
    description: 'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³•2026å¹´11æœˆå¯¾å¿œã€‚å˜ä¾¡è¨ºæ–­ï¼‹å¥‘ç´„æ›¸PDFç”Ÿæˆã‚’æœˆÂ¥490ã§ã€‚',
    url: 'https://rategen.dev',
    siteName: 'RateGen',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateGen â€” é©æ­£å˜ä¾¡ã‚’3ç§’ã§',
    description: 'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³•å¯¾å¿œã€‚æœˆÂ¥490ã§å˜ä¾¡è¨ºæ–­ï¼‹å¥‘ç´„æ›¸ç”Ÿæˆã€‚',
  },
  robots: { index: true, follow: true },
  other: {
    'apple-itunes-app': 'app-id=PLACEHOLDER_APP_ID',
  },
};

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RateGen',
  applicationCategory: 'BusinessApplication',
  url: 'https://rategen.dev',
  description: 'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³•å¯¾å¿œã®å˜ä¾¡è¨ˆç®—ãƒ»å¥‘ç´„æ›¸PDFç”ŸæˆSaaS',
  offers: {
    '@type': 'Offer',
    price: '490',
    priceCurrency: 'JPY',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Support',
    email: 'support@rategen.dev',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-canvas text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-surface-1 focus:px-4 focus:py-2 focus:text-ink focus:outline-none"
        >
          ãƒ¡ã‚¤ãƒ³ã‚³ãƒ³ãƒ†ãƒ³ãƒ„ã¸ã‚¹ã‚­ãƒƒãƒ—
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
