'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { Banner } from './components/banner';
import { Cover } from './components/cover';
import { Toolbar } from './components/toolbar';
import { Title } from './components/title';
import { useQuery } from '@tanstack/react-query';
import { getDocumentById } from '@/actions/get-documents';
import { Skeleton } from '@/components/ui/skeleton';
import { useDocument } from '@/hooks/use-document';
import { cn } from '@/lib/utils';

interface DocumentPageProps {
  params: {
    documentId: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { updateDocumentFn } = useDocument();
  const Editor = useMemo(() => dynamic(() => import('./components/editor'), { ssr: false }), []);

  const { data: document, isLoading } = useQuery({
    queryKey: ['get-document-by-id', params.documentId],
    queryFn: () => getDocumentById({ id: params.documentId as string }),
  });

  async function handleContentChange(value: string) {
    await updateDocumentFn({
      ...document,
      content: value,
    });
  }

  return (
    <div className="pb-40">
      {document?.isArchived && <Banner documentId={document.id} />}
      <Cover initialData={document} />

      <div className={cn('mt-24 mx-auto md:max-w-3xl lg:max-w-4xl', document?.coverImage && 'mt-16')}>
        <Toolbar initialData={document} />

        {isLoading ? (
          <div className="my-2 pl-[58px]">
            <Skeleton className="h-12 w-56 rounded-2xl" />
          </div>
        ) : (
          <Title initialData={document} />
        )}

        {isLoading ? (
          <div className="mt-4 pl-[58px]">
            <Skeleton className="h-5 w-64 rounded-2xl" />
          </div>
        ) : (
          <Editor initialContent={document?.content} onContentChange={handleContentChange} />
        )}
      </div>
    </div>
  );
}
