'use client';

import { useUser, SignedIn, UserButton } from '@clerk/nextjs';

import { IconLoader2, IconSunHigh } from '@tabler/icons-react';
import { Button } from '../../../components/ui/button';
import { Logo } from '../../../components/logo';

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

        <Button variant={'outline'} size={'icon'}>
          <IconSunHigh size={24} />
        </Button>
      </div>
    </header>
  );
}
