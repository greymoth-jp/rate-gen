import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RateGen',
    short_name: 'RateGen',
    description: 'フリーランス保護新法対応の単価診断＋契約書PDF生成SaaS',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9f7f4',
    theme_color: '#1e3a5f',
    lang: 'ja',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
