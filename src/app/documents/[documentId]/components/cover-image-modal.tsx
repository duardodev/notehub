'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { SingleImageDropzone } from './single-image-dropzone';
import { Document } from '@prisma/client';
import { useEdgeStore } from '@/lib/edgestore';
import { useDocument } from '@/hooks/use-document';

interface CoverImageModalProps {
  initialData?: Document | null;
  children: React.ReactNode;
}

export function CoverImageModal({ initialData, children }: CoverImageModalProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const { updateDocumentFn } = useDocument();

  function handleClose() {
    setFile(undefined);
    setIsSubmitting(false);
    setOpen(false);
  }

  async function handleChange(file?: File) {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      let response;

      if (initialData?.coverImage) {
        response = await edgestore.publicFiles.upload({
          file,
          options: { replaceTargetUrl: initialData.coverImage },
        });
      } else {
        response = await edgestore.publicFiles.upload({
          file,
        });
      }

      updateDocumentFn({
        ...initialData,
        coverImage: response?.url,
      });

      handleClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Imagem de capa</h2>
        </DialogHeader>

        <SingleImageDropzone
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
          className="w-full outline-none"
        />
      </DialogContent>
    </Dialog>
  );
}
