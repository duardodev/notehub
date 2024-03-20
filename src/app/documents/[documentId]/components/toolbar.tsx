'use client';

import { ElementRef, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '@/actions/update-document';
import TextareaAutosize from 'react-textarea-autosize';

interface ToolbarProps {
  id?: string;
  parentDocumentId?: string | null;
  initialTitle?: string;
}

export function Toolbar({ id, parentDocumentId, initialTitle }: ToolbarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialTitle);
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: updateDocumentFn } = useMutation({
    mutationFn: updateDocument,
    onMutate: async newData => {
      queryClient.setQueryData(['get-document-by-id', newData.id], newData);

      queryClient.setQueryData(['get-documents'], (oldData: any[]) =>
        oldData?.map(data => (data.id === newData.id ? newData : data))
      );

      queryClient.setQueryData(
        ['get-child-documents', newData.parentDocumentId],
        (oldData: any[]) => oldData?.map(data => (data.id === newData.id ? newData : data))
      );
    },
  });

  function enableInput() {
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialTitle);
      inputRef.current?.focus();
    }, 0);
  }

  async function onInput(value: string) {
    setValue(value);
    updateDocumentFn({
      id,
      parentDocumentId,
      title: value || 'Sem título',
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditing(false);
    }
  }

  return (
    <div className="pl-[58px] group relative">
      {isEditing ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={e => onInput(e.target.value)}
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
