import { routing } from '@/i18n/routing';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-portfolio.com';
  
  const pages = ['', '/about', '/services', '/portfolio', '/contact', '/clients'];
  
  const sitemapEntries = [];

  for (const locale of routing.locales) {
    for (const page of pages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
