"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/config";

export function HomePageContent() {
  const t = useTranslations("HomePage");

  const fadeInVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section ref={targetRef} className="relative py-32 md:py-48 flex flex-col items-center justify-center min-h-[95vh]">
          <motion.div
            initial="hidden"
            animate="show"
            style={{ opacity, y }}
            variants={{
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="container mx-auto px-4 text-center z-10 max-w-6xl"
          >
            <motion.div variants={heroItemVariants} className="mb-16">
              <span className="text-[9px] font-bold tracking-[0.6em] text-foreground/30 uppercase border-y border-foreground/10 py-2 px-4">
                {t("meta.title") || "The Art of Visual Storytelling"}
              </span>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-7xl md:text-9xl lg:text-[13rem] font-bold tracking-tighter mb-14 leading-[0.8] text-foreground uppercase"
            >
              Beyond <br /> The Lens
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-20 max-w-xl mx-auto font-medium tracking-tight leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div variants={heroItemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/portfolio">
                <Button
                  variant="editorial"
                  size="lg"
                  className="h-16 px-12"
                >
                  {t("viewPortfolio")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-16 px-12 rounded-none border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-700 uppercase text-[10px] font-bold tracking-[0.3em]"
                >
                  {t("contact")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
             <span className="text-[8px] font-bold tracking-[0.4em] text-foreground/20 uppercase">Scroll to explore</span>
            <div className="w-px h-24 bg-gradient-to-b from-foreground/20 to-transparent" />
          </motion.div>
        </section>

        {/* Client Logos - Minimalist Editorial */}
        <section className="py-24 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-20 grayscale transition-all duration-1000 hover:opacity-100">
              {["VOGUE", "NAT GEO", "SPOTIFY", "MICHELIN", "ADOBE", "BAZAAR"].map((brand, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-bold tracking-[0.4em] text-[10px]">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Preview - High End Layout */}
        <section className="py-52">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-6 aspect-[3/4] bg-secondary overflow-hidden relative group"
                >
                   <div className="w-full h-full bg-secondary flex items-center justify-center text-foreground/5 text-[10rem] font-bold select-none group-hover:scale-105 transition-transform duration-[2s]">
                      F/1.4
                   </div>
                </motion.div>
                <motion.div 
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  variants={{
                    whileInView: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="lg:col-span-6"
                >
                  <motion.span variants={fadeInVariants} className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] mb-8 block">{t("aboutSection.title")}</motion.span>
                  <motion.h2 variants={fadeInVariants} className="text-6xl md:text-8xl font-bold mb-12 leading-[0.85] tracking-tighter uppercase">Pure <br /> Aesthetics</motion.h2>
                  <motion.p variants={fadeInVariants} className="text-lg text-muted-foreground mb-14 leading-relaxed font-medium max-w-md">
                      {t("aboutSection.description")}
                  </motion.p>
                  <motion.div variants={fadeInVariants}>
                    <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-foreground pb-2 hover:opacity-50 transition-opacity">
                      {t("aboutSection.link")}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
        </section>

        {/* Testimonials - Minimalist Slider */}
        <section className="py-32 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-[10px] font-bold tracking-[0.4em] text-foreground/40 uppercase">
                {t("testimonials.title")}
              </span>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="text-4xl text-foreground/10 font-serif">"</div>
                  <p className="text-lg text-muted-foreground italic leading-relaxed">
                    {t(`testimonials.${i}.text`)}
                  </p>
                  <div className="h-px w-8 bg-foreground/20" />
                  <p className="text-xs font-bold uppercase tracking-widest">
                    {t(`testimonials.${i}.author`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Statement */}
        <section className="py-72 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-8xl md:text-[12rem] font-bold tracking-tighter mb-24 leading-[0.8] uppercase text-balance">
                Let's Define <br /> The Vision
              </h2>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="editorial"
                  className="h-20 px-20 bg-background text-foreground hover:bg-background/90"
                >
                  {t("contact")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
