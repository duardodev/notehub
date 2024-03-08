'use client';

import { useQuery } from '@tanstack/react-query';
import { getArchivedDocuments } from '@/actions/get-documents';
import { useTrashBox } from '@/store/use-trash-box';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { IconArrowBack, IconFile } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { useDocument } from '@/hooks/use-document';

export function TrashBox() {
  const menuIsOpen = useTrashBox(state => state.menuIsOpen);
  const closeMenu = useTrashBox(state => state.closeMenu);
  const { handleDeleteDocument, handleRestoreDocument } = useDocument();

  const { data: documents } = useQuery({
    queryKey: ['get-archived-documents'],
    queryFn: () => getArchivedDocuments(),
  });

  return (
    <CommandDialog open={menuIsOpen} onOpenChange={closeMenu}>
      <CommandInput placeholder="Procurar documentos..." />
      <CommandList>
        <CommandGroup heading="Documentos">
          <CommandEmpty>Nenhum documento encontrado.</CommandEmpty>
          {documents?.map(document => (
            <CommandItem key={document.id} value={`${document.id}-${document.title}`}>
              {document.icon ? (
                <div className="shrink-0 text-[18px]">{document.icon}</div>
              ) : (
                <IconFile className="h-[18px] w-[18px] shrink-0" />
              )}

              <span className="ml-[6px]">{document.title}</span>

              <div className="ml-auto flex items-center gap-[6px]">
                <div
                  role="button"
                  onClick={() => handleRestoreDocument(document.id)}
                  className="p-1 rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  <IconArrowBack className="h-5 w-5 shrink-0" />
                </div>

                <div
                  role="button"
                  onClick={() => handleDeleteDocument(document.id)}
                  className="p-1 rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  <IconTrash className="h-[18px] w-[18px] shrink-0" />
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
