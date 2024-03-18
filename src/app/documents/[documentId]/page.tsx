'use client';

import { useQuery } from '@tanstack/react-query';
import { getDocumentById } from '@/actions/get-documents';
import { Banner } from './components/banner';

interface DocumentPageProps {
  params: {
    documentId: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { data: document } = useQuery({
    queryKey: ['get-document-by-id', params.documentId],
    queryFn: () => getDocumentById({ id: params.documentId as string }),
  });

  return (
    <>
      {document?.isArchived && <Banner documentId={document.id} />}
      <h1 className="mt-20">{document?.title}</h1>
    </>
  );
}
