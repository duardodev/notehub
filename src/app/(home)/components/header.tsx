'use client';

import { useUser, SignedIn, UserButton } from '@clerk/nextjs';

import { Logo } from '../../../components/logo';
import { ThemeToggle } from '@/components/theme-toogle';
import { IconLoader2 } from '@tabler/icons-react';

export function Header() {
  const { isLoaded } = useUser();

  return (
    <header className="h-20 mx-auto max-w-[1300px] px-4 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-3">
        {isLoaded ? (
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        ) : (
          <IconLoader2 className="animate-spin" size={24} />
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}
