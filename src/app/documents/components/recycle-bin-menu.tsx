'use client';

import { useQuery } from '@tanstack/react-query';
import { getArchivedDocuments } from '@/actions/actions';
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

export function RecycleBinMenu() {
  const menuIsOpen = useRecycleBinStore(state => state.menuIsOpen);
  const closeMenu = useRecycleBinStore(state => state.closeMenu);

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
                <IconFile className="shrink-0 h-[18px] w-[18px]" />
              )}

              <span className="ml-1">{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
