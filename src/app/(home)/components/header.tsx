'use client';

import { useUser, SignedIn, UserButton } from '@clerk/nextjs';
import { Logo } from '@/components/logo';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ThemeToggle } from '@/components/theme-toogle';
import { motion } from 'framer-motion';

export function Header() {
  const { isLoaded } = useUser();

  return (
    <motion.header
      className="h-20 mx-auto max-w-[1300px] px-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />

      <div className="flex items-center gap-3">
        {isLoaded ? (
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        ) : (
          <LoadingSpinner />
        )}

        <ThemeToggle />
      </div>
    </motion.header>
  );
}
