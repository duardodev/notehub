'use client';

import { useParams } from 'next/navigation';
import { Item } from './item';
import { useQuery } from '@tanstack/react-query';
import { useExpand } from '@/hooks/use-expand';
import { useDocument } from '@/hooks/use-document';
import { getChildDocuments } from '@/actions/get-documents';
import { IconFile } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

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
            documentIcon={document.icon}
            label={document.title}
            level={level}
            active={params.documentId === document.id}
            expanded={expanded[document.id]}
            handleExpand={() => handleExpand(document.id)}
            onClick={() => handleRedirect(document.id)}
          />

          {expanded[document.id] && (
            <ChildDocuments parentDocumentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
