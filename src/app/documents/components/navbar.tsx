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

  return (
    <nav className="bg-background h-16 w-full px-4 flex items-center justify-between gap-x-3">
      {isCollapsed && (
        <Button onClick={handleResetWidth} variant={'ghost'} size={'icon'} className="h-8 w-8">
          <IconLayoutSidebarLeftExpand size={20} />
        </Button>
      )}

      <div className="w-full flex items-center justify-between">
        {isLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : (
          <div className="flex items-center gap-[6px]">
            {document?.icon && <p>{document.icon}</p>}
            <h1 className="text-sm truncate font-medium">{document?.title}</h1>
          </div>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
