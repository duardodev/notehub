import { Metadata } from 'next';

import { ReactNode } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Navigation } from './components/navigation';
import { TrashBinModal } from './components/trash-bin-modal';
import { SearchModal } from './components/search-modal';
import { ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { EdgeStoreProvider } from '@/lib/edgestore';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import {
  getArchivedDocuments,
  getChildDocuments,
  getDocumentById,
  getDocuments,
} from '@/actions/get-documents';

export const metadata: Metadata = {
  title: 'Documentos',
};

export default async function DocumentsLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-documents'],
    queryFn: () => getDocuments({ parentDocumentId: null }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['get-child-documents'],
    queryFn: () => getChildDocuments,
  });

  await queryClient.prefetchQuery({
    queryKey: ['get-archived-documents'],
    queryFn: getArchivedDocuments,
  });

  await queryClient.prefetchQuery({
    queryKey: ['get-document-by-id'],
    queryFn: () => getDocumentById,
  });

  return (
    <>
      <ClerkLoading>
        <div className="h-screen flex flex-col items-center justify-center">
          <LoadingSpinner />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="h-screen flex">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Navigation />

            <main className="w-screen h-full flex-1 overflow-y-auto absolute md:static">
              <SearchModal />
              <TrashBinModal />
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </main>
          </HydrationBoundary>
        </div>
      </ClerkLoaded>
    </>
  );
}
