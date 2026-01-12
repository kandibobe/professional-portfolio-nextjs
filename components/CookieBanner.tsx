'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const t = useTranslations('CookieBanner');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        // Use a small timeout to avoid synchronous setState warning
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl bg-background/95 backdrop-blur-md border border-border shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                <Cookie size={16} />
                {t('title')}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="text-[10px] font-bold uppercase tracking-widest px-6"
                onClick={handleDecline}
              >
                {t('decline')}
              </Button>
              <Button
                size="sm"
                className="text-[10px] font-bold uppercase tracking-widest px-8"
                onClick={handleAccept}
              >
                {t('accept')}
              </Button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close banner"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
