'use client';

import Image from 'next/image';
import { CoverImageModal } from './cover-image-modal';
import { Button } from '@/components/ui/button';
import { Document } from '@prisma/client';
import { useDocument } from '@/hooks/use-document';
import { IconPhotoPlus, IconX } from '@tabler/icons-react';
import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/lib/utils';

interface CoverProps {
  initialData?: Document | null;
}

export function Cover({ initialData }: CoverProps) {
  const { edgestore } = useEdgeStore();
  const { updateDocumentFn } = useDocument();

  async function handleRemoveCover() {
    if (initialData?.coverImage) {
      await edgestore.publicFiles.delete({ url: initialData?.coverImage });
    }

    updateDocumentFn({
      ...initialData,
      coverImage: null,
    });
  }

  return (
    <div
      className={cn(
        'h-[35vh] w-full group relative',
        !initialData?.coverImage && 'h-0',
        initialData?.coverImage && 'mt-16 bg-muted'
      )}
    >
      {initialData?.coverImage && (
        <>
          <Image src={initialData.coverImage} fill alt="Capa" className="object-cover" />

          <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-2">
            <CoverImageModal initialData={initialData}>
              <Button size="sm" variant="outline" className="text-muted-foreground text-sx">
                <IconPhotoPlus className="h-4 w-4 mr-2" />
                Alterar capa
              </Button>
            </CoverImageModal>

            <Button
              size="sm"
              variant="outline"
              onClick={handleRemoveCover}
              className="text-muted-foreground text-sx"
            >
              <IconX className="h-4 w-4 mr-2" />
              Remover
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
