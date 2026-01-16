import { siteConfig } from '@/lib/config';

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-portfolio.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
