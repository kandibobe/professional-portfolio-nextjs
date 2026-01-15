import {getTranslations} from 'next-intl/server';
import {PortfolioList} from "@/components/PortfolioList";
import { projects as staticProjects } from "@/lib/projects";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'PortfolioPage'});
 
  return {
    title: t('meta.title'),
    description: t('meta.description')
  };
}

export default async function PortfolioPage() {
  // We use static projects for the portfolio to ensure stability and professional performance
  return (
    <div className="container mx-auto px-6 md:px-12 py-32">
      <PortfolioList />
    </div>
  );
}
