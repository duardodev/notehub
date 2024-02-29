'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCreateDocument } from '@/hooks/use-create-document';
import { IconChevronDown, IconChevronRight, IconPlus, Icon } from '@tabler/icons-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ItemProps {
  id?: string;
  level?: number;
  icon: Icon;
  documentIcon?: string;
  label: string;
  active?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  handleExpand?: () => void;
}

export function Item({
  id,
  level = 0,
  icon: Icon,
  documentIcon,
  label,
  active,
  expanded,
  handleExpand,
  onClick,
}: ItemProps) {
  const ChevronIcon = expanded ? IconChevronDown : IconChevronRight;
  const { handleCreateChildDocument } = useCreateDocument(id, expanded, handleExpand);

  function onExpand(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    handleExpand?.();
  }

  return (
    <Button
      onClick={onClick}
      variant={'ghost'}
      size={'sm'}
      style={{ paddingLeft: level ? `${level * 16 + 16}px` : '16px' }}
      className={cn(
        'group/item w-full h-7 pr-4 rounded-none gap-1 justify-start',
        !!id && 'text-foreground/70',
        active && 'bg-accent text-accent-foreground'
      )}
    >
      {!!id && (
        <div
          role="button"
          onClick={onExpand}
          className="rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <ChevronIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px]" />
      )}

      <span className="ml-[2px] truncate">{label}</span>

      {!!id && (
        <div
          role="button"
          onClick={handleCreateChildDocument}
          className="rounded-sm ml-auto opacity-0 group-hover/item:opacity-100 hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <IconPlus className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </Button>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 16 + 26}px` : '16px' }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  );
};
