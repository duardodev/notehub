'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveDocument, createDocument } from '@/actions/actions';
import { toast } from 'sonner';

export const useDocument = (id?: string, expanded?: boolean, handleExpand?: () => void) => {
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

  const { mutateAsync: archiveDocumentFn } = useMutation({
    mutationFn: async () => {
      await archiveDocument({ documentId: id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['get-child-documents'],
      });

      toast.success('Documento movido para lixeira!', { duration: 2000 });
    },
  });

  async function handleCreateDocument() {
    try {
      toast.loading('Criando um novo documento...');
      await createDocumentFn();
      toast.success('Novo documento criado!', { duration: 2000 });
    } catch {
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
    } catch {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  async function handleArchiveDocument(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (!id) return;

    try {
      toast.loading('Movendo documento para lixeira...');
      await archiveDocumentFn();
    } catch {
      toast.error('Erro ao mover documento para lixeira!');
    } finally {
      toast.dismiss();
    }
  }

  return {
    handleCreateDocument,
    handleCreateChildDocument,
    handleArchiveDocument,
  };
};
