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
  title: 'RateGen — 適正単価を3秒で。フリーランス保護新法対応の契約書を1クリックで。',
  description:
    'フリーランス457万人の「適正単価がわからない」「契約書が作れない」を3分で解決。フリーランス保護新法2026年11月施行対応の単価計算＋契約書PDF生成SaaS。',
  metadataBase: new URL('https://rategen.dev'),
  applicationName: 'RateGen',
  authors: [{ name: 'greymoth-jp' }],
  keywords: [
    'フリーランス 適正単価',
    'フリーランス保護新法 契約書',
    '業務委託契約書 テンプレート',
    '単価計算',
    'フリーランス 契約書 PDF',
    '2026 フリーランス新法対応',
  ],
  openGraph: {
    title: 'RateGen — 適正単価を3秒で',
    description: 'フリーランス保護新法2026年11月対応。単価診断＋契約書PDF生成を月¥490で。',
    url: 'https://rategen.dev',
    siteName: 'RateGen',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateGen — 適正単価を3秒で',
    description: 'フリーランス保護新法対応。月¥490で単価診断＋契約書生成。',
  },
  robots: { index: true, follow: true },
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
  description: 'フリーランス保護新法対応の単価計算・契約書PDF生成SaaS',
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
          メインコンテンツへスキップ
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
