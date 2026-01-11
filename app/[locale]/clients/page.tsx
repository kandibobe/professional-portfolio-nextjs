import {getTranslations} from 'next-intl/server';
import {ClientLoginForm} from "@/components/ClientLoginForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ClientsPage'});
 
  return {
    title: t('meta.title'),
    description: t('meta.description')
  };
}

export default function ClientsPage() {
  return <ClientLoginForm />;
}
