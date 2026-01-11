import {getTranslations} from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'AboutPage'});
 
  return {
    title: t('meta.title'),
    description: t('meta.description')
  };
}

import { AboutPageContent } from "@/components/AboutPageContent";

export default function AboutPage() {
  return <AboutPageContent />;
}
