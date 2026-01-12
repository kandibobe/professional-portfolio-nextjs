import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="container mx-auto py-24 px-4 md:px-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-12">
        {t('lastUpdated')}: {new Date().toLocaleDateString()}
      </p>

      <div className="prose prose-invert max-w-none space-y-8 text-foreground/80 text-justify">
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            1. {t('introduction.title')}
          </h2>
          <p>{t('introduction.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            2. {t('dataCollection.title')}
          </h2>
          <p>{t('dataCollection.content')}</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>{t('dataCollection.items.name')}</li>
            <li>{t('dataCollection.items.email')}</li>
            <li>{t('dataCollection.items.usageData')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            3. {t('dataUsage.title')}
          </h2>
          <p>{t('dataUsage.content')}</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>{t('dataUsage.items.provideService')}</li>
            <li>{t('dataUsage.items.communication')}</li>
            <li>{t('dataUsage.items.analytics')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            4. {t('dataSecurity.title')}
          </h2>
          <p>{t('dataSecurity.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            5. {t('yourRights.title')}
          </h2>
          <p>{t('yourRights.content')}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-primary">
            6. {t('contactUs.title')}
          </h2>
          <p>{t('contactUs.content')}</p>
          <p className="mt-4 font-bold text-primary">kirgyzmahmet@gmail.com</p>
        </section>
      </div>
    </div>
  );
}
