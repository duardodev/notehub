'use client';

import { useUser, UserButton } from '@clerk/nextjs';

import { IconLoader2, IconSunHigh } from '@tabler/icons-react';
import { Button } from './ui/button';
import { Logo } from './logo';

export function Header() {
  const { isLoaded } = useUser();

  return (
    <header className="h-20 mx-auto max-w-[1200px] px-4 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-3">
        {isLoaded ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <IconLoader2 className="animate-spin" size={22} />
        )}

        <Button variant={'outline'} size={'icon'}>
          <IconSunHigh size={24} />
        </Button>
      </div>
    </header>
  );
}
