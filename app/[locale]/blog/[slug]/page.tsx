import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/actions/blog';
import { format } from 'date-fns';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-32 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Blog
      </Link>

      <header className="mb-12 text-center">
        <div className="text-sm text-primary font-bold uppercase tracking-widest mb-4">
          {format(new Date(post.date), 'MMMM d, yyyy')} • {post.author}
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{post.title}</h1>
        {post.coverImage && (
          <div className="aspect-video relative rounded-3xl overflow-hidden mt-8 shadow-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert mx-auto">
        {/* Ideally use a markdown renderer here */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}
