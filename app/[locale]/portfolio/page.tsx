import { getTranslations } from 'next-intl/server';
import { PortfolioList } from '@/components/PortfolioList';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PortfolioPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

import { prisma } from '@/lib/db';

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects.map((p: { id: string; slug: string; title: string; imageUrl: string }) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      src: p.imageUrl,
      category: 'Portfolio', // Default category for now
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return <PortfolioList initialProjects={projects} />;
}
