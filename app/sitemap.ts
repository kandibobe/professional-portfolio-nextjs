import { routing } from '@/i18n/routing';
import { projects } from '@/lib/projects';
import { siteConfig } from '@/lib/config';
import { getBlogPosts } from '@/lib/actions/blog';

export default async function sitemap() {
  const baseUrl = siteConfig.url;
  const blogPosts = await getBlogPosts();

  const pages = ['', '/about', '/portfolio', '/contact', '/blog'];

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

    // Dynamic blog posts
    for (const post of blogPosts) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
