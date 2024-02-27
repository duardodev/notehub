'use client';

import { useState } from 'react';
import { Item } from './item';
import { useQuery } from '@tanstack/react-query';
import { getChildDocuments } from '@/actions/actions';
import { IconFile } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface ChildDocumentsProps {
  parentDocumentId: string;
}

export function ChildDocuments({ parentDocumentId }: ChildDocumentsProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function handleExpand(documentId: string) {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  }

  const { data: documents, isFetched } = useQuery({
    queryKey: ['get-child-documents', parentDocumentId],
    queryFn: () => getChildDocuments({ parentDocumentId }),
  });

  return (
    <div className="ml-4">
      <p
        className={cn(
          'hidden ml-7 text-sm text-muted-foreground/80 font-medium',
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
            handleExpand={() => handleExpand(document.id)}
          />

          {expanded[document.id] && <ChildDocuments parentDocumentId={document.id} />}
        </div>
      ))}
    </div>
  );
}
