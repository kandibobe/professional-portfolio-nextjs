'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const t = useTranslations('CookieConsent');

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Use a microtask to avoid synchronous setState warning
      Promise.resolve().then(() => setShowConsent(true));
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineConsent = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-[100]"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-white tracking-tight">Cookie Policy</h3>
              <button
                onClick={() => setShowConsent(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t('message')}{' '}
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                {t('privacy')}
              </Link>
            </p>
            <div className="flex gap-3">
              <Button
                onClick={acceptConsent}
                className="flex-1 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs h-12"
              >
                {t('accept')}
              </Button>
              <Button
                onClick={declineConsent}
                variant="outline"
                className="flex-1 rounded-2xl border-white/10 hover:bg-white/5 text-slate-300 font-bold uppercase tracking-wider text-xs h-12"
              >
                {t('decline')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
