import { useDocument } from '@/hooks/use-document';
import { ElementRef, useRef, useState } from 'react';
import { Document } from '@prisma/client';
import TextareaAutosize from 'react-textarea-autosize';

interface TitleProps {
  initialData?: Document | null;
}

export function Title({ initialData }: TitleProps) {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title);
  const { updateDocumentFn } = useDocument();

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

  function enableInput() {
    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialData?.title);
      inputRef.current?.focus();
    }, 0);
  }

  return (
    <div className="pl-[58px]">
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
