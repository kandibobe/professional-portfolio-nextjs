'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Lock, Mail, Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

export function ClientLoginForm() {
  const t = useTranslations('ClientsPage');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    await signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-background z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10 p-4"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
            >
              <Lock className="text-primary" size={32} />
            </motion.div>
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full h-14 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold shadow-lg border border-white/10 transition-all active:scale-[0.98] flex items-center gap-3"
            >
              <Github size={20} />
              Sign in with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or with credentials
                </span>
              </div>
            </div>

            <form className="space-y-4 opacity-50 pointer-events-none">
              {/* Disabled for now as we use GitHub */}
              <div className="space-y-2">
                <Input placeholder="Email" disabled />
                <Input placeholder="Password" type="password" disabled />
              </div>
              <Button disabled className="w-full">
                Login
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground">
              Credential login is currently disabled. Use GitHub or contact admin.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
