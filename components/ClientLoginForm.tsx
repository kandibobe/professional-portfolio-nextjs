'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Lock, Heart, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gallery } from '@/components/gallery';

// Mock data for client gallery - in real app this would come from a secure API
const MOCK_CLIENT_GALLERY = [
  { id: 101, slug: 'wedding-01', title: 'Wedding 01', category: 'Selection', src: 'bg-blue-500' },
  { id: 102, slug: 'wedding-02', title: 'Wedding 02', category: 'Selection', src: 'bg-red-500' },
  { id: 103, slug: 'wedding-03', title: 'Wedding 03', category: 'Selection', src: 'bg-green-500' },
  { id: 104, slug: 'wedding-04', title: 'Wedding 04', category: 'Selection', src: 'bg-yellow-500' },
];

export function ClientLoginForm() {
  const t = useTranslations('ClientsPage');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo: any 4-digit password works
    if (password.length >= 4) {
      setIsAuthenticated(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  if (isAuthenticated) {
    // Enhance gallery items with favorite status
    const galleryItemsWithFavorites = MOCK_CLIENT_GALLERY.map((item) => ({
      ...item,
      category: favorites.includes(item.id) ? '⭐️ SELECTED' : item.category,
    }));

    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome Back, Client</h1>
            <p className="text-muted-foreground">Wedding Selection - 12 Jan 2026</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Download size={18} />
              Download All
            </Button>
            <div className="bg-secondary px-6 py-2 rounded-full flex items-center gap-2 border border-border">
              <Heart
                size={18}
                className={favorites.length > 0 ? 'fill-primary text-primary' : ''}
              />
              <span className="font-bold">{favorites.length} selected</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          <Gallery items={galleryItemsWithFavorites} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_CLIENT_GALLERY.map((item) => (
              <div key={item.id} className="relative group">
                <div className={`aspect-square rounded-xl ${item.src} mb-2`} />
                <button
                  onClick={() => toggleFavorite(item.id)}
                  aria-label={
                    favorites.includes(item.id) ? 'Remove from selection' : 'Add to selection'
                  }
                  className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all ${
                    favorites.includes(item.id)
                      ? 'bg-primary text-primary-foreground scale-110'
                      : 'bg-black/20 text-white opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Heart size={16} className={favorites.includes(item.id) ? 'fill-current' : ''} />
                </button>
                <p className="text-xs font-medium text-center">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selection bar for mobile/desktop sticky */}
        <AnimatePresence>
          {favorites.length > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-lg border border-border p-4 rounded-2xl shadow-2xl flex items-center gap-6"
            >
              <p className="text-sm font-medium">
                You have selected <span className="font-bold">{favorites.length}</span> photos for
                retouching
              </p>
              <Button size="sm">Send Selection</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

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

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('passwordPlaceholder')}
              className={`flex h-12 w-full rounded-lg border ${isError ? 'border-destructive' : 'border-input'} bg-background px-4 py-3 text-center tracking-widest text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all`}
            />
          </div>
          <Button type="submit" className="w-full py-6 text-base" size="lg">
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
