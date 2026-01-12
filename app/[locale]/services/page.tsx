import { getTranslations } from 'next-intl/server';
import { ServicesPageContent } from '@/components/ServicesPageContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ServicesPage() {
  return <ServicesPageContent />;
}
