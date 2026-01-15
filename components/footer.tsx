'use client';

import { useTranslations } from 'next-intl';
import { Github, Send, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/lib/config';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Header');

  const navigationItems = [
    { name: navT('portfolio'), href: '/portfolio' },
    { name: navT('about'), href: '/about' },
    { name: navT('contacts'), href: '/contact' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: siteConfig.links.github },
    { icon: Send, label: 'Telegram', href: siteConfig.links.telegram },
    { icon: Instagram, label: 'Instagram', href: siteConfig.links.instagram },
    { icon: MessageCircle, label: 'WhatsApp', href: siteConfig.links.whatsapp },
  ];

  return (
    <footer className="relative w-full py-24 px-6 md:px-12 bg-slate-950 border-t border-white/5 text-foreground overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/10 blur-[150px] -z-10" />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="group flex items-center gap-3 w-fit">
              <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed text-base">{t('description')}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  whileHover={{ y: -5, scale: 1.1 }}
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-colors group backdrop-blur-sm"
                >
                  <social.icon size={20} />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-slate-500">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-slate-400 hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-slate-500">
              Get in Touch
            </h4>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm space-y-4">
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Interested in starting a project or just want to say hi?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-primary transition-colors uppercase tracking-widest"
              >
                Let's talk <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. Designed & Developed with passion.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/impressum" className="hover:text-white transition-colors">
              {t('impressum')}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
