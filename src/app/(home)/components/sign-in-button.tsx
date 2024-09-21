'use client';

import { Button } from '@/components/ui/button';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

export function SignInButton() {
  const { data } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!data?.user ? (
        <Button onClick={() => signIn('google')}>
          Fazer login com o Google
          <IconBrandGoogle className="ml-2" size={18} />
        </Button>
      ) : (
        <Button asChild>
          <Link href="/documents">
            Começar
            <LogInIcon size={18} className="ml-2" />
          </Link>
        </Button>
      )}
    </motion.div>
  );
}
