"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Send, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

export function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/portfolio", label: t("portfolio") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contacts") },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-slate-950/70 backdrop-blur-xl py-3 border-b border-white/5"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="z-50 group flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image src="/logo.svg" alt="Logo" width={40} height={40} className="relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">{siteConfig.name}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 bg-white/[0.03] backdrop-blur-md border border-white/10 p-1.5 rounded-full items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-6 py-2 text-[13px] font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all relative group"
            >
              {link.label}
              <motion.span 
                layoutId="nav-underline"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100" 
              />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <Link href={siteConfig.links.telegram} target="_blank">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 bg-white text-black hover:bg-slate-200 text-[12px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-full transition-all shadow-xl shadow-white/5"
            >
              <Send size={14} className="fill-black" />
              {t("book")}
            </motion.button>
          </Link>
          <button
            className="md:hidden z-50 p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-slate-950 z-40 flex flex-col items-center justify-center p-6 md:hidden"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
            <div className="flex flex-col gap-6 w-full max-w-xs">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tighter italic text-slate-500 hover:text-white flex items-center justify-between group"
                  >
                    {link.label}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col gap-6"
              >
                <Link
                  href={siteConfig.links.telegram}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-primary text-primary-foreground py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
                >
                  <Send size={20} />
                  {t("book")}
                </Link>
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
