'use client';

import { ProjectCard } from './ProjectCard';
import { FadeInWhenInView } from './HomeAnimations';
import { Button } from './ui/button';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { Project as DBProject } from '@prisma/client';
import { Project as StaticProject } from '@/lib/projects';

interface FeaturedProjectsProps {
  projects?: DBProject[];
}

export function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  // Select top 3 projects (or specific ones by slug if preferred)
  const featuredProjects = projects.slice(0, 3).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    src: p.imageUrl,
    technologies: [],
    date: p.createdAt.toLocaleDateString(),
    stats: {
      stars: 0,
      forks: 0,
    },
  })) as StaticProject[];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInWhenInView>
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">
              Selected Work
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl font-medium">
              Engineered for precision. Built for scale.
            </p>
          </div>
        </FadeInWhenInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <FadeInWhenInView key={project.id} delay={idx * 0.1}>
              <div className="h-full">
                <ProjectCard project={project} />
              </div>
            </FadeInWhenInView>
          ))}
        </div>

        <FadeInWhenInView delay={0.4}>
          <div className="flex justify-center mt-20">
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="h-16 px-10 rounded-2xl border-primary/20 hover:bg-primary hover:text-primary-foreground text-lg font-bold flex items-center gap-3 transition-all group"
              >
                View Full Portfolio
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </FadeInWhenInView>
      </div>
    </section>
  );
}
