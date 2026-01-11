"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { motion, Variants, Transition } from "framer-motion";
import { ArrowRight, Camera, Calendar, Star, Building2, Globe, Music, Utensils, Zap, Heart } from "lucide-react";

export function HomePageContent() {
  const t = useTranslations("HomePage");

  const fadeInTransition: Transition = { 
    duration: 0.8, 
    ease: [0.21, 1.02, 0.47, 0.98] 
  };

  const fadeInVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: fadeInTransition
    }
  };

  const viewportConfig = { once: true, margin: "-100px" as const };

  const staggerContainer: Variants = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } }
  };

  const heroItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-32 md:py-48 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1.2 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_70%)] -z-10"
          />

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="container mx-auto px-4 text-center z-10 max-w-5xl"
          >
            <motion.div variants={heroItem} className="mb-8">
              <span className="inline-flex items-center gap-2 px-6 py-2 text-[10px] font-black tracking-[0.3em] text-primary uppercase border border-primary/10 rounded-full bg-primary/5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t("meta.title")}
              </span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-6xl md:text-9xl lg:text-[11rem] font-black tracking-tighter mb-8 leading-[0.8] text-gradient"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-xl md:text-3xl text-muted-foreground mb-16 max-w-3xl mx-auto font-medium tracking-tight leading-snug text-balance"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="h-20 px-12 text-xl rounded-[2rem] group bg-primary hover:bg-primary/90 transition-all duration-500 shadow-2xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0"
                >
                  {t("viewPortfolio")}
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-20 px-12 text-xl rounded-[2rem] border-primary/10 hover:bg-secondary transition-all duration-500 hover:-translate-y-1 active:translate-y-0"
                >
                  {t("contact")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </section>

        {/* Client Logos Section */}
        <section className="py-12 border-y border-border/50 bg-secondary/10">
          <div className="container mx-auto px-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-10"
            >
              Trusted by industry leaders
            </motion.p>
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={{
                whileInView: { transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
            >
              {[
                { icon: Building2, name: "Vogue" },
                { icon: Globe, name: "National Geographic" },
                { icon: Music, name: "Spotify" },
                { icon: Utensils, name: "Michelin" },
                { icon: Zap, name: "Adobe" },
                { icon: Heart, name: "Bazaar" }
              ].map((brand, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    initial: { opacity: 0, y: 10 },
                    whileInView: { opacity: 1, y: 0 }
                  }}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <brand.icon size={28} className="transition-transform group-hover:scale-110" />
                  <span className="font-bold tracking-tighter text-lg">{brand.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                <motion.div 
                  initial="initial"
                  whileInView="whileInView"
                  viewport={viewportConfig}
                  variants={fadeInVariants}
                  className="relative aspect-square rounded-3xl overflow-hidden bg-muted"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground italic">
                    [Professional Image Placeholder]
                  </div>
                </motion.div>
                <motion.div 
                  initial="initial"
                  whileInView="whileInView"
                  viewport={viewportConfig}
                  variants={staggerContainer}
                >
                  <motion.h2 variants={fadeInVariants} className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{t("aboutSection.title")}</motion.h2>
                  <motion.p variants={fadeInVariants} className="text-xl text-muted-foreground mb-10 leading-relaxed font-light">
                      {t("aboutSection.description")}
                  </motion.p>
                  <motion.div variants={fadeInVariants}>
                    <Link href="/about">
                        <Button variant="link" className="text-xl p-0 h-auto group text-primary">
                            {t("aboutSection.link")} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
        </section>

        {/* Services Preview Section */}
        <section className="py-48 bg-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              variants={fadeInVariants}
              className="max-w-3xl mb-24"
            >
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Expertise</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">{t("servicesPreview.title")}</h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                We blend technical precision with artistic vision to deliver imagery that resonates. From intimate moments to large-scale events.
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {[
                { icon: Camera, title: t("servicesPreview.wedding"), desc: "Capturing the raw emotion and timeless beauty of your union." },
                { icon: Star, title: t("servicesPreview.portrait"), desc: "Professional portraits that reveal the true character of the subject." },
                { icon: Calendar, title: t("servicesPreview.events"), desc: "Comprehensive coverage for corporate and social gatherings." },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInVariants}
                  className="group relative p-12 rounded-[3rem] bg-background border border-border/50 hover:border-primary/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                    <service.icon size={120} />
                  </div>
                  
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight mb-6">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium mb-8">
                    {service.desc}
                  </p>
                  <Link href="/services" className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                    Explore Service <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
                <motion.div 
                  initial="initial"
                  whileInView="whileInView"
                  viewport={viewportConfig}
                  variants={fadeInVariants}
                  className="text-center mt-20"
                >
                     <Link href="/services">
                        <Button variant="outline" size="lg" className="rounded-full h-14 px-10 border-primary/20 hover:bg-primary/5">
                            {t("services.select")}
                        </Button>
                     </Link>
                </motion.div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-48 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              variants={fadeInVariants}
              className="text-center mb-32"
            >
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Client Feedback</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">{t("testimonials.title")}</h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={fadeInVariants}
                  className="group p-12 bg-secondary/30 backdrop-blur-xl rounded-[3rem] border border-border/50 relative hover:border-primary/20 transition-all duration-700 hover:-translate-y-2"
                >
                  <div className="flex gap-1 text-primary/40 mb-10 group-hover:text-primary transition-colors">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-2xl text-foreground/90 mb-12 leading-relaxed font-medium italic tracking-tight">
                    "{t(`testimonials.${i}.text`)}"
                  </p>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-xl shadow-primary/20">
                      {t(`testimonials.${i}.author`)[0]}
                    </div>
                    <div>
                      <p className="font-black text-lg tracking-tight uppercase">{t(`testimonials.${i}.author`)}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Verified Client</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-48 relative overflow-hidden bg-primary text-primary-foreground">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[160px] -z-10"
          />

          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={viewportConfig}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.span variants={fadeInVariants} className="text-xs font-black uppercase tracking-[0.4em] mb-8 block opacity-60">
                Ready to start?
              </motion.span>
              <motion.h2 variants={fadeInVariants} className="text-6xl md:text-9xl font-black tracking-tighter mb-16 leading-[0.85]">
                Let's create something <span className="italic opacity-50 font-light">extraordinary</span> together.
              </motion.h2>
              <motion.div variants={fadeInVariants}>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-24 px-16 text-2xl rounded-[2.5rem] bg-white text-primary hover:bg-white/90 transition-all duration-500 shadow-2xl hover:scale-105"
                  >
                    Get in Touch
                    <ArrowRight className="ml-4 h-8 w-8" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
