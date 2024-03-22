'use client';

import { useQuery } from '@tanstack/react-query';
import { getArchivedDocuments } from '@/actions/get-documents';
import { useTrashBox } from '@/store/use-trash-box';
import { useDocument } from '@/hooks/use-document';
import { ConfirmationModal } from './confirmation-modal';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { IconArrowBack, IconFile, IconTrash } from '@tabler/icons-react';

export function TrashBinModal() {
  const menuIsOpen = useTrashBox(state => state.menuIsOpen);
  const closeMenu = useTrashBox(state => state.closeMenu);
  const { handleDeleteDocument, handleRestoreDocument, handleRedirect } = useDocument();

  const { data: documents } = useQuery({
    queryKey: ['get-archived-documents'],
    queryFn: () => getArchivedDocuments(),
  });

  function handleSelect(documentId: string) {
    handleRedirect(documentId);
    closeMenu();
  }

  return (
    <CommandDialog open={menuIsOpen} onOpenChange={closeMenu}>
      <CommandInput placeholder="Procurar documentos..." />
      <CommandList>
        <CommandGroup heading="Documentos">
          <CommandEmpty>Nenhum documento encontrado.</CommandEmpty>
          {documents?.map(document => (
            <CommandItem
              key={document.id}
              value={`${document.id}-${document.title}`}
              className="p-0"
            >
              <div
                className="w-full py-2 pl-2 flex items-center"
                onClick={() => handleSelect(document.id)}
              >
                {document.icon ? (
                  <div className="shrink-0 text-[18px]">{document.icon}</div>
                ) : (
                  <IconFile className="h-[18px] w-[18px] shrink-0" />
                )}

                <span className="ml-[6px]">{document.title}</span>
              </div>

              <div className="ml-auto py-2 pr-2 flex items-center gap-[6px]">
                <div
                  role="button"
                  onClick={() => handleRestoreDocument(document.id)}
                  className="p-1 rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  <IconArrowBack className="h-5 w-5 shrink-0" />
                </div>

                <ConfirmationModal onConfirm={() => handleDeleteDocument(document.id)}>
                  <div
                    role="button"
                    className="p-1 rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  >
                    <IconTrash className="h-[18px] w-[18px] shrink-0" />
                  </div>
                </ConfirmationModal>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
