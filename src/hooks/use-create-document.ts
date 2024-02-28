'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/actions/actions';
import { toast } from 'sonner';

export const useCreateDocument = (id?: string, expanded?: boolean, handleExpand?: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createDocumentFn } = useMutation({
    mutationFn: async () => {
      await createDocument({ title: 'Sem título' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });
    },
  });

  const { mutateAsync: createChildDocumentFn } = useMutation({
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

  async function handleCreateDocument() {
    try {
      toast.loading('Criando um novo documento...');
      await createDocumentFn();
      toast.success('Novo documento criado!', { duration: 2000 });
    } catch (error) {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  async function handleCreateChildDocument(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!id) return;

    try {
      toast.loading('Criando um novo documento...');
      await createChildDocumentFn();
    } catch (error) {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  return {
    handleCreateDocument,
    handleCreateChildDocument,
  };
};
