import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { projects } from '@/lib/projects';
import {
  Github,
  ExternalLink,
  Code2,
  Star,
  GitFork,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import type { Metadata } from 'next';
import { Magnetic } from '@/components/Magnetic';
import { RealTimeMonitor } from '@/components/RealTimeMonitor';
import { LiveMarketData } from '@/components/LiveMarketData';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('PortfolioPage');

  let title = project.slug;
  let description = '';
  try {
    title = t(`projects.${project.titleKey}.title`);
    description = t(`projects.${project.titleKey}.description`);
  } catch {
    title = t(`projects.${project.titleKey}`);
    description = t(`projects.${project.descriptionKey}`);
  }

  return {
    title: title,
    description: description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('PortfolioPage');

  let title = project.slug;
  let description = '';
  try {
    title = t(`projects.${project.titleKey}.title`);
    description = t(`projects.${project.titleKey}.description`);
  } catch {
    title = t(`projects.${project.titleKey}`);
    description = t(`projects.${project.descriptionKey}`);
  }

  const category = t(project.categoryKey || 'default');

  return (
    <article className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="mb-16 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/portfolio" className="hover:text-primary transition-colors">
            Portfolio
          </Link>
          <ChevronRight size={12} />
          <span className="text-white">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <CheckCircle2 size={14} className="text-primary" />
                {category}
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">
                {title}
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed font-medium max-w-2xl border-l-4 border-primary pl-8 italic">
                {description}
              </p>
            </div>

            {project.slug === 'mft-algo-bot' && (
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Live Market Data
                </p>
                <LiveMarketData />
              </div>
            )}

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Timeline
                </p>
                <p className="text-2xl font-bold">{project.date}</p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Role
                </p>
                <p className="text-2xl font-bold">Lead Engineer</p>
              </div>
              <div className="md:col-span-2">
                <RealTimeMonitor />
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-6 py-3 bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-8">
              {project.liveUrl && project.liveUrl !== '#' && (
                <Magnetic>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="rounded-full px-12 h-20 text-sm font-black uppercase tracking-[0.2em] gap-3 bg-white text-black hover:bg-slate-200"
                    >
                      <ExternalLink size={18} /> Live System
                    </Button>
                  </a>
                </Magnetic>
              )}
              {project.githubUrl && (
                <Magnetic>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-12 h-20 text-sm font-black uppercase tracking-[0.2em] gap-3 border-white/10 bg-white/5 hover:bg-white/10"
                    >
                      <Github size={18} /> Source Code
                    </Button>
                  </a>
                </Magnetic>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[4rem] overflow-hidden bg-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 group">
              {project.src.startsWith('bg-') ? (
                <div
                  className={`w-full h-full ${project.src} flex flex-col items-center justify-center text-primary/20 group-hover:scale-110 transition-transform duration-[2s]`}
                >
                  <Code2 size={160} strokeWidth={0.5} />
                  <span className="mt-8 text-2xl font-black tracking-widest text-white/5 uppercase italic">
                    Engineered Preview
                  </span>
                </div>
              ) : (
                <Image
                  src={project.src}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  priority
                />
              )}
              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              {project.stats && (
                <div className="absolute bottom-12 left-12 flex gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Stars
                      </span>
                      <span className="text-lg font-bold">{project.stats.stars}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <GitFork size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Forks
                      </span>
                      <span className="text-lg font-bold">{project.stats.forks}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
