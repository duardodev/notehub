'use client';

import { Item } from './item';
import { ChildDocuments } from './child-documents';
import { useQuery } from '@tanstack/react-query';
import { useExpand } from '@/hooks/use-expand';
import { getDocuments } from '@/actions/actions';
import { IconFile } from '@tabler/icons-react';

export function DocumentList() {
  const { expanded, handleExpand } = useExpand();

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
            label={document.title}
            expanded={expanded[document.id]}
            handleExpand={() => handleExpand(document.id)}
          />

          {expanded[document.id] && <ChildDocuments parentDocumentId={document.id} level={1} />}
        </div>
      ))}
    </>
  );
}
