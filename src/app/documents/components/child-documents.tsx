'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useExpand } from '@/hooks/use-expand';
import { useDocument } from '@/hooks/use-document';
import { getChildDocuments } from '@/actions/get-documents';
import { IconFile } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Item } from './Item';

interface ChildDocumentsProps {
  parentDocumentId: string;
  level?: number;
}

export function ChildDocuments({ parentDocumentId, level = 0 }: ChildDocumentsProps) {
  const params = useParams();
  const { expanded, handleExpand } = useExpand();
  const { handleRedirect } = useDocument();

  const {
    data: documents,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ['get-child-documents', parentDocumentId],
    queryFn: () => getChildDocuments({ parentDocumentId }),
  });

  if (isLoading) {
    return <Item.Root.Skeleton level={level} />;
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 16 + 26}px` : undefined }}
        className={cn('hidden text-sm text-muted-foreground/80 font-medium', expanded && 'last:block', isFetched && 'hidden')}
      >
        Nenhum documento
      </p>

      {documents?.map(document => (
        <div key={document.id}>
          <Item.Root
            id={document.id}
            active={params.documentId === document.id}
            onClick={() => handleRedirect(document.id)}
            level={level}
          >
            <Item.ExpandButton expanded={expanded[document.id]} handleExpand={() => handleExpand(document.id)} />
            <Item.Icon documentIcon={document.icon} icon={IconFile} />
            <Item.Title label={document.title} />
            <Item.Actions id={document.id} expanded={expanded[document.id]} handleExpand={() => handleExpand(document.id)} />
          </Item.Root>

          {expanded[document.id] && <ChildDocuments parentDocumentId={document.id} level={level + 1} />}
        </div>
      ))}
    </>
  );
}
