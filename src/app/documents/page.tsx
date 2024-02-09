'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';

export default function Documents() {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image src="/paper-documents.svg" alt="Documents" width={320} height={320} />

      <h1 className="text-lg font-medium">
        {user ? `${user.firstName}, bem-vindo ao NoteHub!` : 'Bem-vindo ao NoteHub!'}
      </h1>

      <Button className="gap-2">
        <IconSquareRoundedPlus size={18} />
        Criar um documento
      </Button>
    </div>
  );
}
