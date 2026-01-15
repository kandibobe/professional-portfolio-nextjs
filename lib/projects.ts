export interface Project {
  id: number | string;
  slug: string;
  titleKey?: string;
  title?: string;
  descriptionKey?: string;
  description?: string;
  categoryKey?: string;
  category?: string;
  src: string;
  technologies: string[];
  date: string;
  githubUrl?: string;
  liveUrl?: string;
  stats?: {
    stars: number;
    forks: number;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "mft-algo-bot",
    titleKey: "mftAlgoBot",
    descriptionKey: "mftAlgoBotDescription",
    categoryKey: "categories.ai",
    src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=1200",
    technologies: ["Python", "TensorFlow", "Pandas", "NumPy", "Docker", "REST API"],
    date: "2026",
    githubUrl: "https://github.com/kandibobe/mft-algotrade-bot",
    liveUrl: "#",
    stats: {
      stars: 12,
      forks: 5
    }
  },
  {
    id: 2,
    slug: "professional-portfolio",
    titleKey: "personalPortfolio",
    descriptionKey: "personalPortfolioDescription",
    categoryKey: "categories.webdev",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    technologies: ["Next.js 15", "React 19", "Tailwind CSS v4", "Framer Motion"],
    date: "2024",
    githubUrl: "https://github.com/kandibobe/professional-portfolio-nextjs",
    liveUrl: "https://kandibobe.ai",
    stats: {
      stars: 8,
      forks: 2
    }
  },
  {
    id: 3,
    slug: "ai-chat-interface",
    titleKey: "aiChatInterface",
    descriptionKey: "aiChatInterfaceDescription",
    categoryKey: "categories.ai",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    technologies: ["React 19", "OpenAI API", "WebSockets", "Node.js"],
    date: "2025",
    githubUrl: "https://github.com/kandibobe/ai-chat",
    liveUrl: "#",
    stats: {
      stars: 24,
      forks: 8
    }
  },
  {
    id: 4,
    slug: "defi-dashboard",
    titleKey: "defiDashboard",
    descriptionKey: "defiDashboardDescription",
    categoryKey: "categories.webdev",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    technologies: ["Next.js", "Web3.js", "Recharts", "Solidity"],
    date: "2025",
    githubUrl: "https://github.com/kandibobe/defi-dash",
    liveUrl: "#",
    stats: {
      stars: 45,
      forks: 12
    }
  }
];
