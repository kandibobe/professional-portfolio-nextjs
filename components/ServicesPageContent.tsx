'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

export function ServicesPageContent() {
  const t = useTranslations('ServicesPage');

  const packages = [
    {
      id: 'mini',
      title: t('packages.mini.title'),
      price: t('packages.mini.price'),
      icon: Zap,
      description: 'Perfect for quick sessions and social media content.',
      features: [
        t('packages.mini.features.0'),
        t('packages.mini.features.1'),
        t('packages.mini.features.2'),
        t('packages.mini.features.3'),
      ],
      popular: false,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      id: 'standard',
      title: t('packages.standard.title'),
      price: t('packages.standard.price'),
      icon: Star,
      description: 'Our most popular choice for comprehensive coverage.',
      features: [
        t('packages.standard.features.0'),
        t('packages.standard.features.1'),
        t('packages.standard.features.2'),
        t('packages.standard.features.3'),
        t('packages.standard.features.4'),
      ],
      popular: true,
      color: 'bg-primary text-primary-foreground',
    },
    {
      id: 'premium',
      title: t('packages.premium.title'),
      price: t('packages.premium.price'),
      icon: Crown,
      description: 'The ultimate experience with no compromises.',
      features: [
        t('packages.premium.features.0'),
        t('packages.premium.features.1'),
        t('packages.premium.features.2'),
        t('packages.premium.features.3'),
        t('packages.premium.features.4'),
      ],
      popular: false,
      color: 'bg-amber-500/10 text-amber-500',
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.02, 0.47, 0.98] } },
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-32 md:py-48">
      <div className="text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-2 text-[10px] font-black tracking-[0.3em] text-primary uppercase border border-primary/10 rounded-full bg-primary/5 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Pricing & Packages
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl md:text-[8rem] font-black tracking-tighter mb-12 leading-[0.85] text-gradient"
        >
          {t('title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium tracking-tight leading-snug text-balance"
        >
          Choose the perfect package for your story. All packages include high-end retouching and
          private online gallery.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={item}
            className={cn(
              'group relative rounded-[3rem] p-12 flex flex-col transition-all duration-700 hover:-translate-y-2',
              pkg.popular
                ? 'bg-primary text-primary-foreground shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] md:scale-105 z-10'
                : 'bg-background border border-border/50 text-card-foreground hover:border-primary/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]'
            )}
          >
            {pkg.popular && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl z-20">
                {t('popular')}
              </div>
            )}

            <div className="mb-12 flex justify-between items-start">
              <div
                className={cn(
                  'w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110 duration-500',
                  pkg.popular ? 'bg-white/10' : 'bg-primary/5 text-primary'
                )}
              >
                <pkg.icon size={36} />
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    'text-5xl font-black tracking-tighter mb-1',
                    pkg.popular ? 'text-white' : 'text-foreground'
                  )}
                >
                  {pkg.price}
                </p>
                <p
                  className={cn(
                    'text-[10px] font-black uppercase tracking-[0.2em]',
                    pkg.popular ? 'text-white/40' : 'text-muted-foreground/60'
                  )}
                >
                  Full Experience
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-3xl font-black tracking-tight mb-4">{pkg.title}</h3>
              <p
                className={cn(
                  'text-lg font-medium leading-relaxed opacity-70',
                  pkg.popular ? 'text-white' : 'text-muted-foreground'
                )}
              >
                {pkg.description}
              </p>
            </div>

            <div
              className={cn('h-px w-full mb-10', pkg.popular ? 'bg-white/10' : 'bg-border/50')}
            />

            <ul className="space-y-6 mb-16 flex-1">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-5 text-base font-semibold">
                  <div
                    className={cn(
                      'mt-1 flex-shrink-0',
                      pkg.popular ? 'text-white' : 'text-primary'
                    )}
                  >
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <span className="opacity-80 leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="w-full">
              <Button
                className={cn(
                  'w-full rounded-[1.5rem] h-20 text-xl font-black group transition-all duration-500',
                  pkg.popular
                    ? 'bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20'
                )}
              >
                {t('select')}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 text-center"
      >
        <p className="text-muted-foreground text-sm font-medium flex items-center justify-center gap-2">
          <Star className="text-primary fill-primary" size={16} />
          All packages can be customized to your specific needs.
          <Star className="text-primary fill-primary" size={16} />
        </p>
      </motion.div>
    </div>
  );
}
