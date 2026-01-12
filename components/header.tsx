"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserNav } from "./UserNav";

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
    { href: "/services", label: t("services") },
    { href: "/clients", label: t("clients") },
    { href: "/contact", label: t("contacts") },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-background/95 py-6 border-b border-border"
          : "bg-transparent py-10"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="z-50 group">
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-[0.5em] uppercase leading-none mb-1">{siteConfig.name}</span>
            <span className="text-[7px] font-bold tracking-[0.8em] text-foreground/40 uppercase leading-none">Visual Arts & Creative Direction</span>
          </div>
        </Link>

        {/* Desktop Navigation - Minimalist Editorial */}
        <nav className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action - Clean Link */}
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-border" />
            <UserNav />
           </div>
           <Link href="/contact" className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:opacity-50 transition-opacity">
              {t("book")}
           </Link>
           <button 
             className="md:hidden z-50 p-2"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             aria-label="Toggle menu"
           >
             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-[0.3em] hover:text-foreground/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 text-sm font-bold uppercase tracking-[0.2em] border border-foreground px-8 py-4"
            >
              {t("book")}
            </Link>
            <div className="mt-8">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
