'use client';

import { Button } from '@/components/ui/button';
import { useCreateDocument } from '@/hooks/use-create-document';
import { IconSquareRoundedPlus } from '@tabler/icons-react';

export function CreateDocumentButton() {
  const { handleCreateDocument } = useCreateDocument();

  return (
    <Button onClick={handleCreateDocument} className="gap-2">
      <IconSquareRoundedPlus size={18} />
      Criar um documento
    </Button>
  );
}
