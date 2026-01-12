export interface Project {
  id: number | string;
  slug: string;
  titleKey?: string;
  title?: string;
  categoryKey?: string;
  category?: string;
  src: string;
  date: string;
  descriptionKey?: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'anna-igor-wedding',
    titleKey: 'annaIgorWedding',
    categoryKey: 'categories.wedding',
    src: 'https://placehold.co/600x800/png?text=Anna+Igor',
    date: 'Giugno 2024',
    descriptionKey: 'annaIgorDescription',
  },
  {
    id: 2,
    slug: 'studio-portrait',
    titleKey: 'studioPortrait',
    categoryKey: 'categories.portrait',
    src: 'https://placehold.co/600x800/png?text=Studio+Portrait',
    date: 'Maggio 2024',
    descriptionKey: 'studioPortraitDescription',
  },
  {
    id: 3,
    slug: 'park-walk',
    titleKey: 'parkWalk',
    categoryKey: 'categories.lovestory',
    src: 'https://placehold.co/600x800/png?text=Park+Walk',
    date: 'Aprile 2024',
    descriptionKey: 'parkWalkDescription',
  },
  {
    id: 4,
    slug: 'business-portrait',
    titleKey: 'businessPortrait',
    categoryKey: 'categories.portrait',
    src: 'https://placehold.co/600x800/png?text=Business+Portrait',
    date: 'Marzo 2024',
    descriptionKey: 'businessPortraitDescription',
  },
  {
    id: 5,
    slug: 'elena-dmitry-wedding',
    titleKey: 'elenaDmitryWedding',
    categoryKey: 'categories.wedding',
    src: 'https://placehold.co/600x800/png?text=Elena+Dmitry',
    date: 'Febbraio 2024',
    descriptionKey: 'elenaDmitryDescription',
  },
  {
    id: 6,
    slug: 'morning-bride',
    titleKey: 'morningBride',
    categoryKey: 'categories.wedding',
    src: 'https://placehold.co/600x800/png?text=Morning+Bride',
    date: 'Gennaio 2024',
    descriptionKey: 'morningBrideDescription',
  },
  {
    id: 7,
    slug: 'rooftop-lovestory',
    titleKey: 'rooftopLovestory',
    categoryKey: 'categories.lovestory',
    src: 'https://placehold.co/600x800/png?text=Rooftop+Lovestory',
    date: 'Dicembre 2023',
    descriptionKey: 'rooftopLovestoryDescription',
  },
  {
    id: 8,
    slug: 'family-session',
    titleKey: 'familySession',
    categoryKey: 'categories.portrait',
    src: 'https://placehold.co/600x800/png?text=Family+Session',
    date: 'Dicembre 2023',
    descriptionKey: 'familySessionDescription',
  },
];
