'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/actions/create-document';
import { archiveDocument } from '@/actions/archive-document';
import { deleteDocument } from '@/actions/delete-document';
import { restoreDocument } from '@/actions/restore-document';
import { toast } from 'sonner';

export const useDocument = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync: createDocumentFn } = useMutation({
    mutationFn: createDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });

      toast.success('Novo documento criado!', { duration: 2000 });
    },
  });

  const { mutateAsync: createChildDocumentFn } = useMutation({
    mutationFn: createDocument,
    onSuccess: async variables => {
      await queryClient.invalidateQueries({
        queryKey: ['get-child-documents', variables?.parentDocumentId],
      });

      toast.success('Novo documento criado!', { duration: 2000 });
    },
  });

  const { mutateAsync: archiveDocumentFn } = useMutation({
    mutationFn: archiveDocument,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });

      queryClient.invalidateQueries({
        queryKey: ['get-child-documents'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['get-archived-documents'],
      });

      toast.success('Documento movido para lixeira!', { duration: 2000 });
    },
  });

  const { mutateAsync: deleteDocumentFn } = useMutation({
    mutationFn: deleteDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-archived-documents'],
      });

      toast.success('Documento deletado!', { duration: 2000 });
    },
  });

  const { mutateAsync: restoreDocumentFn } = useMutation({
    mutationFn: restoreDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get-archived-documents'],
      });

      toast.success('Documento restaurado!', { duration: 2000 });

      queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });

      queryClient.invalidateQueries({
        queryKey: ['get-child-documents'],
      });
    },
  });

  function handleRedirect(documentId?: string) {
    router.push(`/documents/${documentId}`);
  }

  async function handleCreateDocument() {
    try {
      toast.loading('Criando um novo documento...');

      const document = await createDocumentFn({ title: 'Sem título' });
      handleRedirect(document?.id);
    } catch {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  async function handleCreateChildDocument(
    id?: string,
    expanded?: boolean,
    handleExpand?: () => void
  ) {
    if (!id) return;

    try {
      toast.loading('Criando um novo documento...');

      const document = await createChildDocumentFn({
        title: 'Sem título filho',
        parentDocumentId: id,
      });

      handleRedirect(document?.id);

      if (!expanded) {
        handleExpand?.();
      }
    } catch {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  async function handleArchiveDocument(id?: string) {
    if (!id) return;

    try {
      toast.loading('Movendo documento para lixeira...');

      const document = await archiveDocumentFn({
        id,
      });

      if (params.documentId === document?.id) {
        if (document.parentDocumentId) {
          handleRedirect(document.parentDocumentId);
        } else {
          router.push('/documents');
        }
      } else if (params.documentId !== document?.id) {
        handleRedirect(params.documentId as string);
      } else {
        router.push('/documents');
      }
    } catch {
      toast.error('Erro ao mover documento para lixeira!');
    } finally {
      toast.dismiss();
    }
  }

  async function handleDeleteDocument(id?: string) {
    if (!id) return;

    try {
      toast.loading('Deletando documento...');
      await deleteDocumentFn({
        id,
      });
    } catch {
      toast.error('Erro ao deletar documento!');
    } finally {
      toast.dismiss();
    }
  }

  async function handleRestoreDocument(id?: string) {
    if (!id) return;

    try {
      toast.loading('Restaurando documento...');
      await restoreDocumentFn({
        id,
      });
    } catch {
      toast.error('Erro ao restaurar o documento!');
    } finally {
      toast.dismiss();
    }
  }

  return {
    handleRedirect,
    handleCreateDocument,
    handleCreateChildDocument,
    handleArchiveDocument,
    handleDeleteDocument,
    handleRestoreDocument,
  };
};
