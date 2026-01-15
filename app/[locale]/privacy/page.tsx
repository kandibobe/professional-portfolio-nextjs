import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPage');

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <p className="text-muted-foreground mb-4">{t('lastUpdated')}</p>
      <div className="prose prose-invert max-w-none">
        <p>{t('content')}</p>
        {/* Further sections can be added here as needed */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Data Collection</h2>
        <p>
          We do not collect any personal data from visitors, except for information provided
          voluntarily through contact forms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Cookies</h2>
        <p>
          We use essential cookies to ensure the website functions correctly. For more details, see
          our Cookie Consent section.
        </p>
      </div>
    </div>
  );
}
