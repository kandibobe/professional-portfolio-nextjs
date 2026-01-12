'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Home, Camera } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12"
        >
          <h1 className="text-[12rem] md:text-[20rem] font-bold leading-none text-primary/5 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-primary mb-6"
            >
              <Camera size={80} strokeWidth={1} />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Focus Lost</h2>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground mb-12 max-w-md mx-auto font-light text-balance"
        >
          The page you are looking for has been moved or doesn't exist. Let's get you back in focus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button size="lg" className="rounded-full h-14 px-8 gap-2">
              <Home size={18} /> Back to Home
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8">
              View Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
