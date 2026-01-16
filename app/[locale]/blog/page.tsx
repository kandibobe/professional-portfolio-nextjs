import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/lib/actions/blog';
import { Link } from '@/i18n/routing';
import { format } from 'date-fns';
import Image from 'next/image';
import { BlogPost } from '@prisma/client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const t = await getTranslations('BlogPage');

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: BlogPost) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group h-full border border-border bg-card rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300">
              {post.coverImage && (
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="text-sm text-primary font-bold uppercase tracking-widest mb-4">
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
