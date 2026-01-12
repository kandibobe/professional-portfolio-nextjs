import {getTranslations} from 'next-intl/server';
import {PortfolioList} from "@/components/PortfolioList";

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

import { client } from "@/lib/sanity";

async function getProjects() {
  // This query is a placeholder and assumes a Sanity schema
  // You will need to replace this with your actual query
  const query = `*[_type == "project"]{
    "id": _id,
    "slug": slug.current,
    title,
    "category": category->title,
    "src": image.asset->url,
    date
  }`;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return []; // Return empty array on error
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return <PortfolioList initialProjects={projects} />;
}
