'use client';

import { useState, useEffect } from 'react';
import { Gallery } from '@/components/gallery';
import { PortfolioSkeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { projects as mockProjects, Project } from '@/lib/projects';

export function PortfolioList() {
  const t = useTranslations('PortfolioPage');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // If API returns empty (no DB), use mocks
        if (Array.isArray(data) && data.length === 0) {
          setProjects(mockProjects);
        } else {
          setProjects(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((p: any) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              src: p.imageUrl,
              category: 'Portfolio',
              date: new Date(p.createdAt).toLocaleDateString(),
            }))
          );
        }
      } catch {
        setProjects(mockProjects);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = [
    { id: 'all', name: t('categories.all') },
    { id: 'wedding', name: t('categories.wedding') },
    { id: 'portrait', name: t('categories.portrait') },
    { id: 'lovestory', name: t('categories.lovestory') },
  ];

  const translatedProjects = projects.map((project) => ({
    ...project,
    title: project.titleKey ? t(`projects.${project.titleKey}.title`) : project.title || '',
    category: project.categoryKey ? t(project.categoryKey) : project.category || 'Portfolio',
  }));

  const filteredProjects =
    activeCategory === 'all'
      ? translatedProjects
      : translatedProjects.filter((project) => {
          const cat = categories.find((c) => c.id === activeCategory);
          return project.category === cat?.name;
        });

  return (
    <div className="container mx-auto px-4 md:px-8 py-32 md:py-48">
      <div className="flex flex-col items-center mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-2 text-[10px] font-black tracking-[0.3em] text-primary uppercase border border-primary/10 rounded-full bg-primary/5 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Selected Works
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl md:text-[8rem] font-black tracking-tighter mb-12 leading-[0.85] text-gradient"
        >
          {t('title')}
        </motion.h1>

        {/* Categorie */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-2 bg-secondary/30 rounded-3xl md:rounded-full backdrop-blur-md border border-border/50">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'relative px-8 py-3 rounded-2xl md:rounded-full text-sm font-black tracking-tight transition-all duration-500 whitespace-nowrap overflow-hidden',
                activeCategory === cat.id
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 uppercase tracking-widest text-[10px]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Galleria */}
      {isLoading ? <PortfolioSkeleton /> : <Gallery items={filteredProjects} />}
    </div>
  );
}
