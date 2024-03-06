'use client';

import { useQuery } from '@tanstack/react-query';
import { getArchivedDocuments } from '@/actions/get-documents';
import { useRecycleBinStore } from '@/store/use-recycle-bin';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { IconFile } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { useDocument } from '@/hooks/use-document';

export function RecycleBinMenu() {
  const menuIsOpen = useRecycleBinStore(state => state.menuIsOpen);
  const closeMenu = useRecycleBinStore(state => state.closeMenu);
  const { handleDeleteDocument } = useDocument();

  const { data: documents } = useQuery({
    queryKey: ['get-archived-documents'],
    queryFn: () => getArchivedDocuments(),
  });

  return (
    <CommandDialog open={menuIsOpen} onOpenChange={closeMenu}>
      <CommandInput placeholder="Filtrar por título do documento..." />
      <CommandList>
        <CommandEmpty>Nenhum documento encontrado.</CommandEmpty>
        <CommandGroup heading="Documentos">
          {documents?.map(document => (
            <CommandItem key={document.id} value={`${document.id}-${document.title}`}>
              {document.icon ? (
                <div className="shrink-0 text-[18px]">{document.icon}</div>
              ) : (
                <IconFile className="h-[18px] w-[18px] shrink-0" />
              )}

              <span className="ml-[6px]">{document.title}</span>

              <div
                role="button"
                onClick={() => handleDeleteDocument(document.id)}
                className="ml-auto p-1 rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                <IconTrash className="h-[18px] w-[18px] shrink-0" />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
