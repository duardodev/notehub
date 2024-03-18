'use client';

import { Button } from '@/components/ui/button';
import { useDocument } from '@/hooks/use-document';

interface BannerProps {
  documentId: string;
}

export function Banner({ documentId }: BannerProps) {
  const { handleDeleteDocument, handleRestoreDocument } = useDocument();

  return (
    <div className="w-full bg-rose-500 mt-16 p-2 flex items-center justify-center gap-3">
      <p className="text-white text-sm font-medium max-[540px]:hidden">
        Esta página está na Lixeira.
      </p>

      <div className="flex items-center gap-2">
        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => handleRestoreDocument(documentId)}
          className="h-auto whitespace-normal bg-transparent hover:bg-white/15 text-white hover:text-white font-normal py-1 px-2 border-white"
        >
          <span className="max-[346px]:hidden min-[346px]:block">Restaurar página</span>
          <span className="min-[346px]:hidden">Restaurar</span>
        </Button>

        <Button
          size={'sm'}
          variant={'outline'}
          onClick={() => handleDeleteDocument(documentId)}
          className="h-auto whitespace-normal bg-transparent hover:bg-white/15 text-white hover:text-white font-normal py-1 px-2 border-white"
        >
          <span className="max-[346px]:hidden min-[346px]:block">Deletar permanentemente</span>
          <span className="min-[346px]:hidden">Restaurar</span>
        </Button>
      </div>
    </div>
  );
}
