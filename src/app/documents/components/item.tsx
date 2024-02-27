'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { IconChevronDown, IconChevronRight, IconPlus, Icon } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
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
  const queryClient = useQueryClient();
  const ChevronIcon = expanded ? IconChevronDown : IconChevronRight;

  function onExpand(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    handleExpand?.();
  }

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await createDocument({ title: 'Sem título filho', parentDocumentId: id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-child-documents', id],
      });

      toast.success('Novo documento criado!', { duration: 2000 });

      if (!expanded) {
        handleExpand?.();
      }
    },
  });

  async function handleCreateChildDocument(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!id) return;

    try {
      toast.loading('Criando um novo documento...');
      await mutateAsync();
    } catch (error) {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
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
