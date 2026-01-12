'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
  const t = useTranslations('ContactPage');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('type'), // Map 'type' to 'subject' as expected by the API
      message: formData.get('message'),
      _honeypot: formData.get('_honeypot'), // Basic spam protection
    };

    // Honeypot check
    if (data._honeypot) {
      console.warn('Spam detected');
      setStatus('success'); // Pretend it succeeded
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  const inputClasses = "flex w-full rounded-[1.5rem] border border-border/50 bg-secondary/30 backdrop-blur-md px-8 py-5 text-lg font-medium tracking-tight ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/30 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground/40";

  return (
    <div className="max-w-5xl mx-auto px-4 py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <span className="inline-flex items-center gap-2 px-6 py-2 text-[10px] font-black tracking-[0.3em] text-primary uppercase border border-primary/10 rounded-full bg-primary/5 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {t("title")}
        </span>
        <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-12 leading-[0.85] text-gradient">{t("title")}</h1>
        <p className="text-xl md:text-3xl text-muted-foreground max-w-2xl mx-auto font-medium tracking-tight leading-snug text-balance">
          {t("description")}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-primary/5 border border-primary/20 p-12 rounded-[2.5rem] text-center mb-8 flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('form.success.title')}</h3>
              <p className="text-muted-foreground">{t('form.success.description')}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setStatus('idle')}
              className="rounded-full px-8 h-12"
            >
              {t('form.success.button')}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl mb-8 flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{t('form.error')}</span>
              </motion.div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit} noValidate={loading}>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_honeypot">Do not fill this field</label>
                <input
                  type="text"
                  id="_honeypot"
                  name="_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-foreground/70 ml-2">{t('form.name')}</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    className={inputClasses}
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-foreground/70 ml-2">{t('form.email')}</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className={inputClasses}
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="type" className="text-sm font-bold uppercase tracking-widest text-foreground/70 ml-2">{t('form.type')}</label>
                <div className="relative">
                  <select 
                    id="type"
                    name="type"
                    className={cn(inputClasses, "appearance-none cursor-pointer")}
                  >
                    <option value="wedding">{t('form.types.wedding')}</option>
                    <option value="portrait">{t('form.types.portrait')}</option>
                    <option value="lovestory">{t('form.types.lovestory')}</option>
                    <option value="reportage">{t('form.types.reportage')}</option>
                    <option value="other">{t('form.types.other')}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-muted-foreground">
                    <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-foreground/70 ml-2">{t('form.message')}</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className={cn(inputClasses, "h-auto min-h-[150px] resize-none")}
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full h-24 text-2xl font-black rounded-[2rem] group transition-all duration-500 relative overflow-hidden bg-primary shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-8 w-8 text-primary-foreground" />
                ) : (
                  <span className="relative z-10 flex items-center gap-4 uppercase tracking-widest text-xs">
                    {t("form.submit")}
                    <Send
                      size={20}
                      className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
