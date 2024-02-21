'use client';

import { Item } from './item';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '@/actions/actions';
import { IconFile } from '@tabler/icons-react';

export function DocumentList() {
  const { data: documents } = useQuery({
    queryKey: ['get-documents'],
    queryFn: async () => getDocuments(),
  });

  return (
    <>
      {documents?.map(document => (
        <Item key={document.id} icon={IconFile} label={document.title} />
      ))}
    </>
  );
}
