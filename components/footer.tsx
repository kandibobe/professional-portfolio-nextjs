import { useTranslations } from 'next-intl';
import { Instagram, Send, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full py-24 px-4 md:px-8 bg-secondary/30 border-t border-border mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                <span className="font-black text-xl">P</span>
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">
                Photo<span className="text-primary/50">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-lg font-light leading-relaxed">
              Capturing moments that tell your unique story through the lens of professional photography. Available for worldwide bookings.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-primary/50">Navigation</h4>
            <ul className="space-y-4">
              {["Portfolio", "About", "Services", "Clients", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-primary/50">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Send, label: "Telegram" },
                { icon: Globe, label: "VK" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p className="font-medium">
            © {new Date().getFullYear()} PHOTO. {t("rights")}
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
