"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { Code2, Cpu, Globe, Send, Clock, Layers, Database, Box, Terminal, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import { AnimatedHero, FadeInWhenInView, HeroItem, BackgroundEffects, CustomCursor } from "./HomeAnimations";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";
import dynamic from "next/dynamic";
import Image from "next/image";

const Scene3D = dynamic(() => import("./Scene3D").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-950/20" />
});

const HeroSearch = dynamic(() => import("./HeroSearch").then((mod) => mod.HeroSearch), {
  ssr: false
});

interface HomePageContentProps {
  translations: {
    hero: {
      available: string;
      greeting: string;
    };
    subtitle: string;
    viewPortfolio: string;
    contact: string;
    techStack: { name: string; icon: string }[];
    aboutSection: {
      title: string;
      description: string;
      link: string;
      imageAlt: string;
      heading: string;
    };
    testimonials: {
      title: string;
      items: { text: string; author: string }[];
    };
    cta: {
      heading: string;
    };
  };
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "nextjs": return <Layers className="w-6 h-6" />;
    case "react": return <Box className="w-6 h-6" />;
    case "typescript": return <Code2 className="w-6 h-6" />;
    case "tailwind": return <Globe className="w-6 h-6" />;
    case "python": return <Terminal className="w-6 h-6" />;
    case "tensorflow": return <Cpu className="w-6 h-6" />;
    case "pandas": return <Database className="w-6 h-6" />;
    case "docker": return <Box className="w-6 h-6" />;
    default: return <Code2 className="w-6 h-6" />;
  }
};

export function HomePageContent({ translations }: HomePageContentProps) {
  const { hero, subtitle, viewPortfolio, contact, techStack, aboutSection, testimonials, cta } = translations;

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden text-foreground">
      <CustomCursor />
      <BackgroundEffects />
      
      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <Scene3D />
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <AnimatedHero>
              <HeroItem>
                <div className="flex flex-col gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    {hero.available}
                  </motion.div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9] uppercase">
                    HI, I'M <br />
                    <span className="text-primary">{siteConfig.name}</span>
                  </h2>
                  <h3 className="text-2xl md:text-4xl font-bold text-muted-foreground leading-tight tracking-tight mt-4">
                    AI & Algo-Trading <br /> Engineer
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-lg mt-6 leading-relaxed font-medium">
                    {subtitle}
                  </p>
                </div>
              </HeroItem>

              <HeroItem>
                <div className="flex flex-wrap gap-6 mt-10">
                  <Magnetic>
                    <Link href="/portfolio">
                      <Button
                        size="lg"
                        className="h-16 px-10 rounded-2xl text-lg font-black flex items-center gap-3 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all active:scale-95 group"
                      >
                        {viewPortfolio}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-lg font-black flex items-center gap-3 transition-all active:scale-95"
                      >
                        <Clock size={20} />
                        {contact}
                      </Button>
                    </Link>
                  </Magnetic>
                </div>
              </HeroItem>
            </AnimatedHero>

            {/* Hero Visual - Professional Glass Mockup */}
            <FadeInWhenInView delay={0.4}>
              <div className="relative group lg:block hidden">
                <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-blue-500/10 to-transparent rounded-full blur-[100px] opacity-50" />
                <div className="relative p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden aspect-[4/3]">
                   {/* Recommendation: Replace this with a generated high-quality AI visual or professional photo */}
                   <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <div className="absolute inset-0 flex items-center justify-center text-white/10 text-9xl font-black select-none">AI</div>
                      <Image 
                        src="/hero-visual.jpg" 
                        alt="AI Engineering Visual" 
                        fill 
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                   </div>
                   
                   <div className="absolute top-8 left-8 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>

                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-6"
                      >
                        <Shield className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Neural Optimization</h4>
                      <div className="w-32 h-1 bg-primary/50 rounded-full" />
                   </div>
                </div>
              </div>
            </FadeInWhenInView>
          </div>
        </section>

        {/* Portfolio Quick Access */}
        <section className="py-32 relative">
           <div className="container mx-auto px-6 md:px-12">
              <FadeInWhenInView>
                <div className="flex flex-col items-center text-center mb-20">
                   <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">Portfolio</h2>
                   <p className="text-xl text-muted-foreground max-w-2xl font-medium">Engineered for precision. Built for scale.</p>
                   <div className="mt-12 w-full max-w-3xl">
                     <HeroSearch />
                   </div>
                </div>
              </FadeInWhenInView>
           </div>
        </section>

        {/* Tech Stack - Clean Minimalist Grid */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-20">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">Capabilities</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Tech Stack</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {techStack.map((tech, idx) => (
                <FadeInWhenInView key={idx} delay={idx * 0.05}>
                  <div className="group flex items-center gap-4 p-6 bg-secondary/50 border border-border rounded-2xl hover:border-primary transition-all duration-300">
                    <div className="w-12 h-12 flex items-center justify-center bg-background rounded-xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all">
                      {getIcon(tech.icon)}
                    </div>
                    <span className="font-bold text-lg">{tech.name}</span>
                  </div>
                </FadeInWhenInView>
              ))}
            </div>
          </div>
        </section>

        {/* About Preview - Professional Profile Layout */}
        <section className="py-32 relative bg-secondary/30">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                   <div className="aspect-[4/5] bg-slate-200 rounded-[2rem] overflow-hidden shadow-2xl relative flex items-center justify-center text-slate-400">
                      <span className="text-sm font-bold uppercase tracking-widest">Photo Placeholder</span>
                      {/* Recommendation: Replace with professional portrait */}
                      <Image 
                        src="/profile.jpg" 
                        alt={aboutSection.imageAlt} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                   </div>
                   <div className="absolute -bottom-10 -right-10 p-8 bg-background border border-border rounded-3xl shadow-2xl hidden md:block">
                      <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-3">
                            <Zap className="text-primary" />
                            <span className="font-black uppercase tracking-widest text-xs">High Performance</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <Sparkles className="text-primary" />
                            <span className="font-black uppercase tracking-widest text-xs">AI-Driven</span>
                         </div>
                      </div>
                   </div>
                </div>
                <div>
                  <FadeInWhenInView delay={0}>
                    <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-6 block">{aboutSection.title}</span>
                  </FadeInWhenInView>
                  <FadeInWhenInView delay={0.1}>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-tighter"
                        dangerouslySetInnerHTML={{ __html: aboutSection.heading }}
                    />
                  </FadeInWhenInView>
                  <FadeInWhenInView delay={0.2}>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-medium">
                        {aboutSection.description}
                    </p>
                  </FadeInWhenInView>
                  <FadeInWhenInView delay={0.3}>
                    <Link href="/about">
                      <Button variant="outline" size="lg" className="h-14 px-8 rounded-xl font-bold border-primary text-primary hover:bg-primary hover:text-white transition-all">
                        {aboutSection.link}
                        <ArrowRight size={20} className="ml-2" />
                      </Button>
                    </Link>
                  </FadeInWhenInView>
                </div>
              </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-48 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <FadeInWhenInView>
              <div className="max-w-5xl mx-auto p-1 py-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-[3rem]">
                <div className="bg-slate-950/90 backdrop-blur-3xl p-20 rounded-[2.9rem] border border-white/5 relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 uppercase text-balance italic leading-[0.85]">
                    Build the <br /> Future Today
                  </h2>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="h-20 px-16 bg-primary text-primary-foreground hover:bg-white hover:text-black rounded-2xl text-2xl font-black shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all active:scale-95 group"
                    >
                      LET'S WORK
                      <ArrowRight size={28} className="ml-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInWhenInView>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/5 rounded-full blur-[150px] -z-0" />
        </section>
      </main>
    </div>
  );
}
