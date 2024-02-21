'use client';

import { Button } from '@/components/ui/button';
import { createDocument } from '@/actions/actions';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function CreateDocumentButton() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await createDocument({ title: 'Sem título' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-documents'],
      });
    },
  });

  async function handleCreateDocument() {
    try {
      toast.loading('Criando um novo documento...');
      await mutateAsync();
      toast.success('Novo documento criado!', { duration: 2000 });
    } catch (error) {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  return (
    <Button onClick={handleCreateDocument} className="gap-2">
      <IconSquareRoundedPlus size={18} />
      Criar um documento
    </Button>
  );
}
