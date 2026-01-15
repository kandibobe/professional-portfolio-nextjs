import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'ImpressumPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function Impressum() {
  const t = useTranslations('ImpressumPage');

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mb-4">{t('operator')}</h2>
        <p>
          Vladyslav Kobiakov
          <br />
          [Your Address Line 1]
          <br />
          [Your Address Line 2]
          <br />
          Berlin, Germany
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('contact')}</h2>
        <p>
          Email: vladyslav@kobiakov.dev
          <br />
          Website: Kobiakov.dev
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">{t('disclaimer')}</h2>
        <p>
          The contents of our pages were created with great care. However, we cannot guarantee the
          accuracy, completeness, or timeliness of the content.
        </p>
      </div>
    </div>
  );
}
