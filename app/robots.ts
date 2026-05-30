import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/pricing', '/about', '/help', '/privacy', '/terms', '/tokushoho'],
        disallow: ['/dashboard', '/estimate', '/contracts', '/settings', '/api/', '/login'],
      },
    ],
    sitemap: 'https://rategen.dev/sitemap.xml',
  };
}
