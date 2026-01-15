"use client";

import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import { Code2, GitCommit, Terminal, Cpu, ChevronDown, User, Monitor, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AboutPageContent() {
  const t = useTranslations("AboutPage");

  const fadeIn: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-32 md:py-48 text-foreground">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden aspect-[4/5] flex items-center justify-center shadow-2xl bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
             <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
             <User size={120} strokeWidth={0.5} className="text-primary/20 relative z-10" />
             <div className="absolute bottom-8 left-8 p-4 glass rounded-xl border-white/5 flex items-center gap-3 z-20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Available for hire</span>
             </div>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn} 
            className="space-y-4"
          >
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs block">
              About Me
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight uppercase">
              {t("title")}
            </h1>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p className="text-xl text-white font-medium">{t("intro")}</p>
            <p>{t("description")}</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={{
              whileInView: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-2 gap-4 pt-4"
          >
            {[
              { icon: Code2, val: "50+", label: t("stats.projects") },
              { icon: Terminal, val: "5+", label: t("stats.experience") },
              { icon: Monitor, val: "100%", label: "Responsive" },
              { icon: Zap, val: "A+", label: "Performance" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                className="p-6 bg-slate-900/60 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon size={20} />
                </div>
                <span className="block text-2xl font-bold text-white mb-1">
                  {stat.val}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mt-48 max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Help Center</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-white">{t("faq.title")}</h2>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <FAQItem key={i} question={t(`faq.${i}.q`)} answer={t(`faq.${i}.a`)} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden transition-all duration-500 hover:border-primary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-bold text-white tracking-tight">{question}</span>
        <div className={cn("p-1.5 rounded-full bg-white/5 text-primary transition-transform duration-500", isOpen && "rotate-180 bg-primary text-primary-foreground")}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div className={cn("grid transition-all duration-500 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <p className="p-6 pt-0 text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
