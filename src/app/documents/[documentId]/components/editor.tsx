'use client';

import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import { PartialBlock } from '@blocknote/core';
import { useEdgeStore } from '@/lib/edgestore';
import { useTheme } from 'next-themes';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
  onContentChange: (value: string) => void;
}

export default function Editor({ initialContent, onContentChange }: EditorProps) {
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();

  async function handleUpload(file: File) {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  }

  const editor = useCreateBlockNote({
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div className="pl-1">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        onChange={() => onContentChange(JSON.stringify(editor.document, null, 2))}
        data-theming-css-variables-demo
      />
    </div>
  );
}
