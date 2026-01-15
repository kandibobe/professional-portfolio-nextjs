import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Project } from "@/lib/projects";
import { Github, Play, Eye, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("PortfolioPage");

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.src && (project.src.startsWith("/") || project.src.startsWith("http")) ? (
          <Image
            src={project.src}
            alt={project.titleKey ? t(`projects.${project.titleKey}`) : project.title || project.slug}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized={project.src.startsWith("http")}
          />
        ) : (
          <div className={`w-full h-full ${project.src} flex items-center justify-center text-primary/20 bg-slate-900`}>
             <span className="text-4xl font-bold uppercase tracking-widest">{project.slug.split('-').map(s => s[0]).join('')}</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm bg-slate-950/20">
           {project.liveUrl && project.liveUrl !== "#" && (
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm transition-shadow hover:shadow-xl hover:shadow-primary/40"
            >
              <Play size={16} fill="currentColor" />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-sm border border-white/20 transition-all hover:bg-white/20"
            >
              <Github size={16} />
              Code
            </motion.a>
          )}
        </div>
      </div>

      <div className="p-8 flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] font-bold px-3 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-full uppercase tracking-wider">
              {tech}
            </span>
          ))}
        </div>

        <Link href={`/portfolio/${project.slug}`} className="group/title flex items-start justify-between">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover/title:text-primary transition-colors line-clamp-1">
            {project.titleKey ? t(`projects.${project.titleKey}`) : project.title}
          </h3>
          <ArrowUpRight className="text-white/40 group-hover/title:text-primary group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all" size={20} />
        </Link>

        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed h-10">
          {project.descriptionKey ? t(`projects.${project.descriptionKey}`) : project.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
           <div className="flex flex-col">
             <span className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">Release Date</span>
             <span className="text-xs font-medium text-slate-300">{project.date}</span>
           </div>
           <Link href={`/portfolio/${project.slug}`} className="group/btn flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
             Learn More 
             <motion.div
               animate={{ x: [0, 4, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >
               <Eye size={14} />
             </motion.div>
           </Link>
        </div>
      </div>
    </motion.article>
  );
}
