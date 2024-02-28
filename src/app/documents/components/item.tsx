'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { IconChevronDown, IconChevronRight, IconPlus, Icon } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useCreateDocument } from '../../../hooks/use-create-document';
import { toast } from 'sonner';

interface ItemProps {
  id?: string;
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
      className={cn(
        'group/item min-w-full h-7 pl-4 rounded-none gap-1 justify-start',
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

      {documentIcon ? <div className="text-[18px]">{documentIcon}</div> : <Icon size={18} />}

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
