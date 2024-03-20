'use client';

import { useParams } from 'next/navigation';
import { Item } from './item';
import { ChildDocuments } from './child-documents';
import { useQuery } from '@tanstack/react-query';
import { useDocument } from '@/hooks/use-document';
import { useExpand } from '@/hooks/use-expand';
import { getDocuments } from '@/actions/get-documents';
import { IconFile } from '@tabler/icons-react';

export function DocumentList() {
  const params = useParams();
  const { expanded, handleExpand } = useExpand();
  const { handleRedirect } = useDocument();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['get-documents'],
    queryFn: () => getDocuments(),
  });

  if (isLoading) {
    return <Item.Skeleton />;
  }

  return (
    <>
      {documents?.map(document => (
        <div key={document.id}>
          <Item
            id={document.id}
            icon={IconFile}
            documentIcon={document.icon}
            label={document.title}
            active={params.documentId === document.id}
            expanded={expanded[document.id]}
            handleExpand={() => handleExpand(document.id)}
            onClick={() => handleRedirect(document.id)}
          />

          {expanded[document.id] && <ChildDocuments parentDocumentId={document.id} level={1} />}
        </div>
      ))}
    </>
  );
}
