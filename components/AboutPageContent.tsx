"use client";

import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import { Camera, Calendar, Award, MapPin, ChevronDown } from "lucide-react";
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
    <div className="container mx-auto px-4 md:px-8 py-32 md:py-48">
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-5/12 aspect-[3/4] relative group"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-6 transition-transform group-hover:rotate-0 duration-700" />
          <div className="absolute inset-0 bg-secondary rounded-[3rem] flex items-center justify-center text-muted-foreground shadow-2xl overflow-hidden border border-border/50">
            <span className="text-sm font-black uppercase tracking-widest opacity-20">{t("photoAlt")}</span>
            <div className="absolute bottom-10 left-10 flex items-center gap-2 text-foreground/40 font-black uppercase tracking-widest text-[10px]">
              <MapPin size={12} /> Worldwide
            </div>
          </div>
        </motion.div>

        <div className="w-full lg:w-7/12 space-y-12">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn} 
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 text-[10px] font-black tracking-[0.3em] text-primary uppercase border border-primary/10 rounded-full bg-primary/5 backdrop-blur-md">
              The Artist
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-gradient">
              {t("title")}
            </h1>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-8 text-xl md:text-2xl text-muted-foreground font-medium tracking-tight leading-relaxed text-balance"
          >
            <p>{t("intro")}</p>
            <p className="text-lg md:text-xl font-normal opacity-80">{t("description")}</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={{
              whileInView: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8"
          >
            {[
              { icon: Camera, val: "150+", label: t("stats.weddings") },
              { icon: Calendar, val: "5+", label: t("stats.experience") },
              { icon: Award, val: "12", label: "Awards" },
              { icon: MapPin, val: "20+", label: "Countries" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                }}
                className="p-10 bg-secondary/30 rounded-[2rem] border border-border/50 hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-black/5">
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <span className="block text-4xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                      {stat.val}
                    </span>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                      {stat.label}
                    </span>
                  </div>
                </div>
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
        <div className="text-center mb-20">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Help Center</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{t("faq.title")}</h2>
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
    <div className="group rounded-[2rem] border border-border/50 bg-secondary/20 overflow-hidden transition-all duration-500 hover:border-primary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 md:p-10 flex items-center justify-between text-left group-hover:bg-secondary/30 transition-colors"
      >
        <span className="text-xl md:text-2xl font-black tracking-tight">{question}</span>
        <div className={cn("p-2 rounded-full bg-primary/5 text-primary transition-transform duration-500", isOpen && "rotate-180 bg-primary text-primary-foreground")}>
          <ChevronDown size={24} />
        </div>
      </button>
      <div className={cn("grid transition-all duration-500 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <p className="p-8 md:p-10 pt-0 text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
