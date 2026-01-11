import {getTranslations} from 'next-intl/server';
import {ContactForm} from "@/components/ContactForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ContactPage'});
 
  return {
    title: t('meta.title'),
    description: t('meta.description')
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
