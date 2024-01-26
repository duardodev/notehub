'use client';

import { useUser, SignedIn, UserButton } from '@clerk/nextjs';

import { Button } from '../../../components/ui/button';
import { Logo } from '../../../components/logo';
import { IconLoader2 } from '@tabler/icons-react';
import { SunMedium } from 'lucide-react';

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
          <SunMedium size={22} />
        </Button>
      </div>
    </header>
  );
}
