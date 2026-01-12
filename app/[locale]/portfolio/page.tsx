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

export default async function PortfolioPage() {
  return <PortfolioList />;
}
