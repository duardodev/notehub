'use client';

import { ElementRef, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconPicker } from './icon-picker';
import { useDocument } from '@/hooks/use-document';
import { IconMoodSmile, IconX } from '@tabler/icons-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ToolbarProps {
  id?: string;
  parentDocumentId?: string | null;
  initialTitle?: string;
  initialIcon?: string | null;
}

export function Toolbar({ id, parentDocumentId, initialTitle, initialIcon }: ToolbarProps) {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { updateDocumentFn } = useDocument();

  function enableInput() {
    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialTitle);
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
      id,
      parentDocumentId,
      title: value || 'Sem título',
      icon: initialIcon,
    });
  }

  function handleIconSelect(icon: string) {
    updateDocumentFn({
      id,
      parentDocumentId,
      title: initialTitle,
      icon,
    });
  }

  function handleIconRemove() {
    updateDocumentFn({
      id,
      parentDocumentId,
      title: initialTitle,
      icon: null,
    });
  }

  return (
    <div className="pl-[58px] group relative">
      {!!initialIcon ? (
        <div className="group/icon py-6 flex items-center gap-2">
          <IconPicker onChange={handleIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{initialIcon}</p>
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
      ) : (
        <div className="py-4 opacity-0 group-hover:opacity-100 transition">
          <IconPicker asChild onChange={handleIconSelect}>
            <Button size="sm" variant="outline" className="text-muted-foreground text-sx">
              <IconMoodSmile className="h-4 w-4 mr-2" />
              Adicionar ícone
            </Button>
          </IconPicker>
        </div>
      )}

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
          {initialTitle}
        </div>
      )}
    </div>
  );
}
