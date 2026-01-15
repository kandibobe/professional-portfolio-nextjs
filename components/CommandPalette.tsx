"use client";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
} from "kbar";
import { useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  User,
  Mail,
  Github,
  Twitter,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";

export function CommandPalette({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "back",
      perform: () => router.push("/"),
      icon: <Home size={20} />,
    },
    {
      id: "portfolio",
      name: "Portfolio",
      shortcut: ["p"],
      keywords: "projects work",
      perform: () => router.push("/portfolio"),
      icon: <Briefcase size={20} />,
    },
    {
      id: "about",
      name: "About",
      shortcut: ["a"],
      keywords: "me bio",
      perform: () => router.push("/about"),
      icon: <User size={20} />,
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email message",
      perform: () => router.push("/contact"),
      icon: <Mail size={20} />,
    },
    {
      id: "github",
      name: "GitHub",
      shortcut: ["g"],
      keywords: "source code",
      perform: () => window.open("https://github.com/kandibobe", "_blank"),
      icon: <Github size={20} />,
    },
    {
      id: "darkTheme",
      name: "Dark Theme",
      shortcut: ["d", "t"],
      keywords: "dark mode",
      perform: () => setTheme("dark"),
      icon: <Moon size={20} />,
    },
    {
      id: "lightTheme",
      name: "Light Theme",
      shortcut: ["l", "t"],
      keywords: "light mode",
      perform: () => setTheme("light"),
      icon: <Sun size={20} />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-slate-950/40 backdrop-blur-sm z-[100]">
          <KBarAnimator className="w-full max-w-[600px] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="text-slate-500" size={20} />
              <KBarSearch className="w-full bg-transparent outline-none text-white placeholder-slate-500 text-sm" />
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-500 font-bold uppercase">
                ESC
              </div>
            </div>
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5">
            {item}
          </div>
        ) : (
          <div
            className={`px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
              active ? "bg-primary text-white" : "text-slate-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-bold">{item.name}</span>
            </div>
            {item.shortcut?.length ? (
              <div className="flex gap-1">
                {item.shortcut.map((sc) => (
                  <kbd
                    key={sc}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      active ? "bg-white/20" : "bg-white/5 border border-white/10"
                    }`}
                  >
                    {sc}
                  </kbd>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  );
}
