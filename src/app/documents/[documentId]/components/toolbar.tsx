'use client';

import { Button } from '@/components/ui/button';
import { IconPicker } from './icon-picker';
import { CoverImageModal } from './cover-image-modal';
import { useDocument } from '@/hooks/use-document';
import { Document } from '@prisma/client';

import { IconMoodSmile, IconPhotoPlus, IconX } from '@tabler/icons-react';

interface ToolbarProps {
  initialData?: Document | null;
}

export function Toolbar({ initialData }: ToolbarProps) {
  const { updateDocumentFn } = useDocument();

  function handleIconSelect(icon: string) {
    updateDocumentFn({
      ...initialData,
      icon,
    });
  }

  function handleIconRemove() {
    updateDocumentFn({
      ...initialData,
      icon: null,
    });
  }

  return (
    <div className="pl-[58px] group relative">
      {!!initialData?.icon && (
        <div className="group/icon py-4 flex items-center gap-2">
          <IconPicker onChange={handleIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{initialData?.icon}</p>
          </IconPicker>

          <Button
            size="icon"
            variant="outline"
            onClick={handleIconRemove}
            className="rounded-full text-muted-foreground opacity-0 group-hover/icon:opacity-100 transition"
          >
            <IconX size={16} />
          </Button>
        </div>
      )}

      <div className="py-4 flex items-center flex-wrap gap-2 transition">
        {!initialData?.icon && (
          <IconPicker asChild onChange={handleIconSelect}>
            <Button size="sm" variant="outline" className="w-[156px] px-2 text-muted-foreground text-sx">
              <IconMoodSmile className="h-4 w-4 mr-2" />
              Adicionar ícone
            </Button>
          </IconPicker>
        )}

        {!initialData?.coverImage && (
          <CoverImageModal initialData={initialData}>
            <Button size="sm" variant="outline" className="w-[156px] px-2 text-muted-foreground text-sx">
              <IconPhotoPlus className="h-4 w-4 mr-2" />
              Adicionar capa
            </Button>
          </CoverImageModal>
        )}
      </div>
    </div>
  );
}
