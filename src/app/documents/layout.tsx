import { Metadata } from 'next';

import { ReactNode } from 'react';
import { Navigation } from './components/navigation';
import { TrashBinModal } from './components/trash-bin-modal';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Documentos',
};

export default function DocumentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <div className="h-screen flex flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="h-screen flex">
          <Navigation />

          <main className="w-screen h-full flex-1 overflow-y-auto absolute md:static">
            <TrashBinModal />
            {children}
          </main>
        </div>
      </ClerkLoaded>
    </>
  );
}
