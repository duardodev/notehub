'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDocument } from '@/hooks/use-document';
import { useExpand } from '@/hooks/use-expand';
import { getDocuments } from '@/actions/get-documents';
import { IconFile } from '@tabler/icons-react';
import { ChildDocuments } from './child-documents';
import { Item } from './Item';

export function DocumentList() {
  const params = useParams();
  const { expanded, handleExpand } = useExpand();
  const { handleRedirect } = useDocument();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['get-documents'],
    queryFn: () => getDocuments({ parentDocumentId: null }),
  });

  if (isLoading) {
    return <Item.Root.Skeleton />;
  }

  return (
    <>
      {documents?.map(document => (
        <div key={document.id}>
          <Item.Root id={document.id} active={params.documentId === document.id} onClick={() => handleRedirect(document.id)}>
            <Item.ExpandButton expanded={expanded[document.id]} handleExpand={() => handleExpand(document.id)} />
            <Item.Icon icon={IconFile} documentIcon={document.icon} />
            <Item.Title label={document.title} />
            <Item.Actions id={document.id} expanded={expanded[document.id]} handleExpand={() => handleExpand(document.id)} />
          </Item.Root>

          {expanded[document.id] && <ChildDocuments parentDocumentId={document.id} level={1} />}
        </div>
      ))}
    </>
  );
}
