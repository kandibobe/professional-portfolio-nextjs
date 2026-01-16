"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { useTranslations } from "next-intl";
import { Project as DBProject } from "@prisma/client";
import { Project as StaticProject } from "@/lib/projects";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ProjectModal } from "@/components/ProjectModal";
import { getGithubProjects } from "@/lib/github";
import { getProjects } from "@/lib/actions/projects";

// Adaptive type to handle both static and DB projects
type AdaptableProject = StaticProject | DBProject | any;

export function PortfolioList() {
  const t = useTranslations("PortfolioPage");
  const [selectedProject, setSelectedProject] = useState<AdaptableProject | null>(null);
  const [allProjects, setAllProjects] = useState<AdaptableProject[]>([]);

  useEffect(() => {
    async function loadAllProjects() {
      try {
        const [dbProjects, githubProjects] = await Promise.all([
          getProjects().catch(() => []),
          getGithubProjects().catch(() => [])
        ]);

        // Map DB projects to a format compatible with ProjectCard if needed
        const mappedDbProjects = (dbProjects as any[]).map(p => ({
          ...p,
          src: p.imageUrl, // ProjectCard expects src
          stats: {
            stars: p.stars || 0,
            forks: p.forks || 0
          }
        }));

        // Merge and avoid duplicates by slug
        const combined = [...mappedDbProjects];
        
        (githubProjects as any[]).forEach(gp => {
          if (!combined.some(p => p.slug === gp.slug)) {
            combined.push(gp);
          }
        });
        
        setAllProjects(combined);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    }
    loadAllProjects();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Dynamic Glow Effect */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-500"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
            <div className="relative">
              <ProjectCard project={project} />
            </div>
          </motion.div>
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
