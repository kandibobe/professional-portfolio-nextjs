"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export function ClientLoginForm() {
  const t = useTranslations('ClientsPage');

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-background to-background opacity-50" />
       
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border text-center"
      >
        <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-6">
          <Lock className="h-6 w-6 text-foreground/70" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
          {t('description')}
        </p>

        <form className="space-y-5">
          <div className="relative">
            <input 
              type="password" 
              placeholder={t('passwordPlaceholder')}
              className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-center tracking-widest text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />
          </div>
          <Button 
            type="submit"
            className="w-full py-6 text-base"
            size="lg"
          >
            {t('submit')}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border">
          <button className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors">
            {t('forgotPassword')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
