'use client';

import { Item } from './item';
import { useQuery } from '@tanstack/react-query';
import { useExpand } from '@/hooks/use-expand';
import { getChildDocuments } from '@/actions/get-documents';
import { IconFile } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface ChildDocumentsProps {
  parentDocumentId: string;
  level?: number;
}

export function ChildDocuments({ parentDocumentId, level = 0 }: ChildDocumentsProps) {
  const { expanded, handleExpand } = useExpand();

  const {
    data: documents,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ['get-child-documents', parentDocumentId],
    queryFn: () => getChildDocuments({ parentDocumentId }),
  });

  if (isLoading) {
    return <Item.Skeleton level={level} />;
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 16 + 26}px` : undefined }}
        className={cn(
          'hidden text-sm text-muted-foreground/80 font-medium',
          expanded && 'last:block',
          isFetched && 'hidden'
        )}
      >
        Nenhum documento
      </p>

      {documents?.map(document => (
        <div key={document.id}>
          <Item
            id={document.id}
            icon={IconFile}
            label={document.title}
            expanded={expanded[document.id]}
            level={level}
            handleExpand={() => handleExpand(document.id)}
          />

          {expanded[document.id] && (
            <ChildDocuments parentDocumentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
