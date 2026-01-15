"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const t = useTranslations("PortfolioPage");

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            layoutId={`project-${project.id}`}
            className="relative w-full max-w-7xl h-[90vh] bg-slate-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              title="Close modal"
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-2/3 h-full relative bg-black">
              {project.src.startsWith("/") || project.src.startsWith("http") ? (
                <Image
                  src={project.src}
                  alt={project.slug}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className={`w-full h-full ${project.src} flex items-center justify-center`}>
                  <span className="text-9xl font-black text-white/5 uppercase">{project.slug}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 md:hidden" />
            </div>

            <div className="w-full md:w-1/3 h-full bg-slate-900 p-8 md:p-12 overflow-y-auto border-l border-white/5 flex flex-col">
              <div className="flex-1">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
                >
                  {project.categoryKey ? t(project.categoryKey) : project.category}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-black text-white mb-6 uppercase leading-[0.9]"
                >
                  {project.titleKey ? t(`projects.${project.titleKey}`) : project.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-400 leading-relaxed mb-8"
                >
                  {project.descriptionKey ? t(`projects.${project.descriptionKey}`) : project.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-slate-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-3 mt-8 pt-8 border-t border-white/5"
              >
                {project.liveUrl && (
                  <Button asChild className="w-full bg-primary text-white h-12 text-sm font-bold uppercase tracking-widest">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      View Live <ExternalLink size={16} className="ml-2" />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="outline" className="w-full border-white/10 text-white h-12 text-sm font-bold uppercase tracking-widest hover:bg-white/5">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      Source Code <Github size={16} className="ml-2" />
                    </a>
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
