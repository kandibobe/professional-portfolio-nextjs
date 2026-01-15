import { getTranslations } from 'next-intl/server';
import { HomePageContent } from '@/components/HomePageContent';
import { siteConfig } from '@/lib/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Home() {
  const t = await getTranslations('HomePage');
  const tGlobal = await getTranslations();

  const translations = {
    hero: {
      available: t("hero.available"),
      greeting: t("hero.greeting"),
    },
    subtitle: t("subtitle"),
    viewPortfolio: t("viewPortfolio"),
    contact: t("contact"),
    techStack: [
      { name: tGlobal("TechStack.nextjs"), icon: "nextjs" },
      { name: tGlobal("TechStack.react"), icon: "react" },
      { name: tGlobal("TechStack.typescript"), icon: "typescript" },
      { name: tGlobal("TechStack.tailwind"), icon: "tailwind" },
      { name: tGlobal("TechStack.python"), icon: "python" },
      { name: tGlobal("TechStack.tensorflow"), icon: "tensorflow" },
      { name: tGlobal("TechStack.pandas"), icon: "pandas" },
      { name: tGlobal("TechStack.docker"), icon: "docker" },
    ],
    aboutSection: {
      title: t("aboutSection.title"),
      description: t("aboutSection.description"),
      link: t("aboutSection.link"),
      imageAlt: t("aboutSection.imageAlt"),
      heading: t("aboutSection.heading"),
    },
    testimonials: {
      title: t("testimonials.title"),
      items: [
        { text: t("testimonials.1.text"), author: t("testimonials.1.author") },
        { text: t("testimonials.2.text"), author: t("testimonials.2.author") },
        { text: t("testimonials.3.text"), author: t("testimonials.3.author") },
      ]
    },
    cta: {
      heading: t("cta.heading"),
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "jobTitle": "AI & Algo-Trading Engineer",
    "sameAs": [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.linkedin
    ],
    "description": t("subtitle"),
    "knowsAbout": ["AI", "Algorithmic Trading", "Web Development", "Next.js", "Python", "TensorFlow"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageContent translations={translations} />
    </>
  );
}
