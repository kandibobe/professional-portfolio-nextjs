'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    import('@/lib/logger').then((mod) => mod.default.error(error));
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12"
        >
          <h1 className="text-[10rem] md:text-[15rem] font-bold leading-none text-red-500/5 select-none uppercase tracking-tighter">
            System Fail
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-red-500 mb-6"
            >
              <AlertTriangle size={80} strokeWidth={1} />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Critical Error</h2>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground mb-12 max-w-md mx-auto font-light text-balance"
        >
          The system encountered an unexpected state. This incident has been logged.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={() => reset()} size="lg" className="rounded-full h-14 px-8 gap-2 bg-primary">
            <RefreshCcw size={18} /> Reinitialize
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 gap-2 border-white/10 bg-white/5 hover:bg-white/10">
              <Home size={18} /> Safe Mode (Home)
            </Button>
          </Link>
        </motion.div>
        
        {error.digest && (
          <p className="mt-8 text-xs text-muted-foreground/30 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
