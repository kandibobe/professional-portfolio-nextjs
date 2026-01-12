import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { projects } from '@/lib/projects';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('PortfolioPage');
  const title = t(`projects.${project.titleKey}.title`);
  const description = t(`projects.${project.titleKey}.description`);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      // In a real app, you'd use a real image URL here.
      // Since we use local images or placeholders, we might fallback to site og-image or the project image if it's a URL.
      // images: [project.src],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const query = `*[_type == "project" && slug.current == $slug][0]{
    "id": _id,
    "slug": slug.current,
    title,
    "category": category->title,
    "src": image.asset->url,
    date,
    description
  }`;
  const project = await client.fetch(
    query,
    { slug },
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!project) {
    notFound();
  }

  // We need to use useTranslations inside a component, but this is a server component.
  // However, next-intl allows usage in server components if configured correctly.
  // Alternatively, we can just use the keys and pass them to a client component,
  // but for simplicity let's stick to standard next-intl server usage pattern
  // or use getTranslations (async).

  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('PortfolioPage');

  const title = project.title;
  const category = project.category;
  const description = project.description;

  return (
    <article className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link href="/portfolio">
            <Button variant="ghost" className="group pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('title')} {/* Using "Portfolio" as back link text */}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">
                {category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                {description}
              </p>
            </div>

            <div className="flex gap-8 text-sm text-muted-foreground border-y border-border/50 py-6">
              <div>
                <p className="font-bold text-foreground mb-1 uppercase tracking-wider text-xs">
                  Date
                </p>
                <p>{project.date}</p>
              </div>
              {/* Add more metadata here if needed */}
            </div>

            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8">
                Prenota un servizio simile
              </Button>
            </Link>
          </div>

          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary shadow-2xl">
            {project.src.startsWith('bg-') ? (
              <div
                className={`w-full h-full ${project.src} flex items-center justify-center text-muted-foreground`}
              >
                <span className="text-4xl font-light italic opacity-50">{title}</span>
              </div>
            ) : (
              <Image src={project.src} alt={title} fill className="object-cover" priority />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
