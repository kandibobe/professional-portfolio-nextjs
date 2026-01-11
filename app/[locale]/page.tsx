import {getTranslations} from 'next-intl/server';
import {HomePageContent} from "@/components/HomePageContent";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HomePage.meta'});
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function Home() {
  return <HomePageContent />;
}
