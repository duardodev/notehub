import { Metadata } from 'next';

import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { IconLoader2 } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Navigation } from './components/navigation';

export const metadata: Metadata = {
  title: 'Documentos',
};

export default function DocumentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <div className="h-screen flex flex-col items-center justify-center">
          <IconLoader2 className="animate-spin" size={26} />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="h-screen flex">
          <Navigation />

          <main className="w-screen h-full flex-1 overflow-y-auto absolute md:static">
            {children}
          </main>
        </div>
      </ClerkLoaded>
    </>
  );
}
