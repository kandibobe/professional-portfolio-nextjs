import { useTranslations } from 'next-intl';
import { Instagram, Send, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Header');

  const navigationItems = [
    { name: navT('portfolio'), href: '/portfolio' },
    { name: navT('about'), href: '/about' },
    { name: navT('services'), href: '/services' },
    { name: navT('clients'), href: '/clients' },
    { name: navT('contacts'), href: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: siteConfig.links.instagram },
    { icon: Send, label: 'Telegram', href: siteConfig.links.telegram },
    { icon: Globe, label: 'VK', href: siteConfig.links.vk },
  ];

  return (
    <footer className="w-full py-24 px-4 md:px-8 bg-secondary/30 border-t border-border mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="z-50 group inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-[0.5em] uppercase leading-none mb-1">
                  {siteConfig.name}
                </span>
                <span className="text-[7px] font-bold tracking-[0.8em] text-foreground/40 uppercase leading-none">
                  Visual Arts & Creative Direction
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm text-lg font-light leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-primary/50">
              {t('navigation')}
            </h4>
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-primary/50">
              {t('connect')}
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-none bg-background border border-border flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t('rights')}
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
