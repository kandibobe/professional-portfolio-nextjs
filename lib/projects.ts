export interface Project {
  id: number;
  slug: string;
  titleKey: string;
  categoryKey: string;
  src: string;
  date: string;
  descriptionKey?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'anna-igor-wedding',
    titleKey: 'annaIgorWedding',
    categoryKey: 'categories.wedding',
    src: 'bg-secondary',
    date: 'Giugno 2024',
    descriptionKey: 'annaIgorDescription',
  },
  {
    id: 2,
    slug: 'studio-portrait',
    titleKey: 'studioPortrait',
    categoryKey: 'categories.portrait',
    src: 'bg-secondary/80',
    date: 'Maggio 2024',
    descriptionKey: 'studioPortraitDescription',
  },
  {
    id: 3,
    slug: 'park-walk',
    titleKey: 'parkWalk',
    categoryKey: 'categories.lovestory',
    src: 'bg-secondary/60',
    date: 'Aprile 2024',
    descriptionKey: 'parkWalkDescription',
  },
  {
    id: 4,
    slug: 'business-portrait',
    titleKey: 'businessPortrait',
    categoryKey: 'categories.portrait',
    src: 'bg-secondary',
    date: 'Marzo 2024',
    descriptionKey: 'businessPortraitDescription',
  },
  {
    id: 5,
    slug: 'elena-dmitry-wedding',
    titleKey: 'elenaDmitryWedding',
    categoryKey: 'categories.wedding',
    src: 'bg-secondary/80',
    date: 'Febbraio 2024',
    descriptionKey: 'elenaDmitryDescription',
  },
  {
    id: 6,
    slug: 'morning-bride',
    titleKey: 'morningBride',
    categoryKey: 'categories.wedding',
    src: 'bg-secondary/60',
    date: 'Gennaio 2024',
    descriptionKey: 'morningBrideDescription',
  },
  {
    id: 7,
    slug: 'rooftop-lovestory',
    titleKey: 'rooftopLovestory',
    categoryKey: 'categories.lovestory',
    src: 'bg-secondary/80',
    date: 'Dicembre 2023',
    descriptionKey: 'rooftopLovestoryDescription',
  },
  {
    id: 8,
    slug: 'family-session',
    titleKey: 'familySession',
    categoryKey: 'categories.portrait',
    src: 'bg-secondary',
    date: 'Dicembre 2023',
    descriptionKey: 'familySessionDescription',
  },
];
