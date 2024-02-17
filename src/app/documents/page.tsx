'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';
import { createDocument } from '../../actions/actions';
import { toast } from 'sonner';

export default function Documents() {
  const { user } = useUser();

  async function handleCreateDocument() {
    try {
      toast.loading('Criando um novo documento...');
      await createDocument({ title: 'Sem título' });
      toast.success('Novo documento criado!', { duration: 2000 });
    } catch (error) {
      toast.error('Erro ao criar um novo documento!');
    } finally {
      toast.dismiss();
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image src="/paper-documents.svg" alt="Documents" width={320} height={320} />

      <h1 className="text-lg font-medium">
        {user ? `${user.firstName}, bem-vindo ao NoteHub!` : 'Bem-vindo ao NoteHub!'}
      </h1>

      <Button onClick={handleCreateDocument} className="gap-2">
        <IconSquareRoundedPlus size={18} />
        Criar um documento
      </Button>
    </div>
  );
}
