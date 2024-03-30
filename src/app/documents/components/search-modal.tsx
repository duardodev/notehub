'use client';

import { useEffect } from 'react';
import { useSearch } from '@/store/use-search';
import { useQuery } from '@tanstack/react-query';
import { useDocument } from '@/hooks/use-document';
import { getDocuments } from '@/actions/get-documents';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { IconFile } from '@tabler/icons-react';

export function SearchModal() {
  const modalIsOpen = useSearch(state => state.modalIsOpen);
  const closeModal = useSearch(state => state.closeModal);
  const toggleModal = useSearch(state => state.toggleModal);
  const { handleRedirect } = useDocument();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleModal();
      }
    };
    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  const { data: documents } = useQuery({
    queryKey: ['get-documentss'],
    queryFn: () => getDocuments({ parentDocumentId: undefined }),
  });

  function handleSelect(documentId: string) {
    handleRedirect(documentId);
    closeModal();
  }

  return (
    <CommandDialog open={modalIsOpen} onOpenChange={closeModal}>
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
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
