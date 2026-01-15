import { routing } from '@/i18n/routing';
import { projects } from '@/lib/projects';
import { siteConfig } from '@/lib/config';

export default function sitemap() {
  const baseUrl = siteConfig.url;
  
  const pages = ['', '/about', '/portfolio', '/contact'];
  
  const sitemapEntries = [];

  for (const locale of routing.locales) {
    // Static pages
    for (const page of pages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }

    // Dynamic project pages
    for (const project of projects) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
