'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/hooks/use-document';
import { IconSquareRoundedPlus } from '@tabler/icons-react';

export function CreateDocumentButton() {
  const { handleCreateDocument } = useDocument();

  return (
    <Button onClick={handleCreateDocument} className="gap-2">
      <IconSquareRoundedPlus size={18} />
      Criar um documento
    </Button>
  );
}
