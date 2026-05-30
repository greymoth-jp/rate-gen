import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RateGen',
    short_name: 'RateGen',
    description: 'ãƒ•ãƒªãƒ¼ãƒ©ãƒ³ã‚¹ä¿è­·æ–°æ³•å¯¾å¿œã®å˜ä¾¡è¨ºæ–­ï¼‹å¥‘ç´„æ›¸PDFç”ŸæˆSaaS',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9f7f4',
    theme_color: '#1e3a5f',
    lang: 'ja',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    prefer_related_applications: false,
    related_applications: [
      {
        platform: 'play' as const,
        id: 'PLACEHOLDER_PACKAGE_NAME',
        url: 'https://play.google.com/store/apps/details?id=PLACEHOLDER_PACKAGE_NAME',
      },
    ],
  };
}
