'use client';

import { WorldMap } from '@/components/WorldMap';
import { useTranslations } from 'next-intl';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export function ContactForm() {
  const t = useTranslations('ContactPage');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get('website')) {
      setIsSuccess(true);
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">
              {t.rich('title', {
                br: () => <br />,
                span: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">
              {t('description')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Mail
                    className="text-white group-hover:text-primary transition-colors"
                    size={24}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-1">
                    {t('emailLabel')}
                  </h4>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-lg text-slate-300 hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <MapPin
                    className="text-white group-hover:text-primary transition-colors"
                    size={24}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-1">
                    {t('locationLabel')}
                  </h4>
                  <p className="text-lg text-slate-300">{t('locationValue')}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <WorldMap />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
          >
            {isSuccess ? (
              <div className="text-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Send className="text-white" size={32} />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">{t('form.successTitle')}</h3>
                <p className="text-slate-400">{t('form.successMessage')}</p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 bg-white/10 hover:bg-white/20 text-white"
                >
                  {t('form.sendAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field */}
                <div className="hidden">
                  <Input name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                      {t('form.name')}
                    </label>
                    <Input
                      name="name"
                      placeholder={t('form.namePlaceholder')}
                      className="bg-slate-950/50 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-600 focus:border-primary/50"
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                      {t('form.email')}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      className="bg-slate-950/50 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-600 focus:border-primary/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    {t('form.subject')}
                  </label>
                  <Input
                    name="subject"
                    placeholder={t('form.subjectPlaceholder')}
                    className="bg-slate-950/50 border-white/10 h-14 rounded-xl text-white placeholder:text-slate-600 focus:border-primary/50"
                    required
                    minLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    {t('form.message')}
                  </label>
                  <Textarea
                    name="message"
                    placeholder={t('form.messagePlaceholder')}
                    className="bg-slate-950/50 border-white/10 min-h-[150px] rounded-xl text-white placeholder:text-slate-600 focus:border-primary/50 resize-none p-4"
                    required
                    minLength={10}
                  />
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? t('form.sending') : t('form.submit')}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
