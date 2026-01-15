'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6 text-center"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Client Login</h1>
          <p className="text-muted-foreground">Sign in to view your private galleries.</p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full"
            variant="outline"
          >
            Sign in with Google
          </Button>
          {/* Email sign-in will be added after database setup */}
        </div>
      </motion.div>
    </div>
  );
}
