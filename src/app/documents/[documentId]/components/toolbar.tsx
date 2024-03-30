'use client';

import { ElementRef, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPicker } from './icon-picker';
import { CoverImageModal } from './cover-image-modal';
import { useDocument } from '@/hooks/use-document';
import { Document } from '@prisma/client';

import { IconMoodSmile, IconPhotoPlus, IconX } from '@tabler/icons-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ToolbarProps {
  initialData?: Document | null;
}

export function Toolbar({ initialData }: ToolbarProps) {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title);
  const { updateDocumentFn } = useDocument();

  function enableInput() {
    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialData?.title);
      inputRef.current?.focus();
    }, 0);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditing(false);
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    updateDocumentFn({
      ...initialData,
      title: value || 'Sem título',
    });
  }

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

      <div className="py-4 lg:opacity-0 lg:group-hover:opacity-100 flex items-center flex-wrap gap-2 transition">
        {!initialData?.icon && (
          <IconPicker asChild onChange={handleIconSelect}>
            <Button
              size="sm"
              variant="outline"
              className="w-[156px] px-2 text-muted-foreground text-sx"
            >
              <IconMoodSmile className="h-4 w-4 mr-2" />
              Adicionar ícone
            </Button>
          </IconPicker>
        )}

        {!initialData?.coverImage && (
          <CoverImageModal initialData={initialData}>
            <Button
              size="sm"
              variant="outline"
              className="w-[156px] px-2 text-muted-foreground text-sx"
            >
              <IconPhotoPlus className="h-4 w-4 mr-2" />
              Adicionar capa
            </Button>
          </CoverImageModal>
        )}
      </div>

      {isEditing ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          className="bg-transparent text-[#3F3F3F] dark:text-[#CFCFCF] text-5xl font-bold break-words outline-none resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="text-[#3F3F3F] dark:text-[#CFCFCF] text-5xl font-bold pb-[11.5px] break-words outline-none"
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
}
