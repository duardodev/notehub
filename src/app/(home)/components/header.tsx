'use client';

import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toogle';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const { data } = useSession();

  return (
    <motion.header
      className="h-20 mx-auto max-w-[1120px] px-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo />

      <div className="flex items-center gap-3">
        {data?.user && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={data?.user.image!} />
            <AvatarFallback>NH</AvatarFallback>
          </Avatar>
        )}

        <ThemeToggle />
      </div>
    </motion.header>
  );
}
