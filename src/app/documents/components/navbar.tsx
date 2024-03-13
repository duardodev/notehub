'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { getDocumentById } from '@/actions/get-documents';
import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { ThemeToggle } from '@/components/theme-toogle';

interface NavbarProps {
  isCollapsed: boolean;
  handleResetWidth: () => void;
}

export function Navbar({ isCollapsed, handleResetWidth }: NavbarProps) {
  const params = useParams();

  const { data: document, isLoading } = useQuery({
    queryKey: ['get-document-by-id', params.documentId],
    queryFn: () => getDocumentById({ id: params.documentId as string }),
  });

  if (isLoading) {
    return (
      <nav className="w-full p-4 flex items-center gap-x-3">
        <Skeleton className="h-4 w-24" />
      </nav>
    );
  }

  return (
    <nav className="w-full p-4 flex items-center gap-x-3">
      {isCollapsed && (
        <Button onClick={handleResetWidth} variant={'ghost'} size={'icon'} className="h-8 w-8">
          <IconLayoutSidebarLeftExpand size={20} />
        </Button>
      )}

      <h1 className="text-sm truncate font-medium">{document?.title}</h1>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
