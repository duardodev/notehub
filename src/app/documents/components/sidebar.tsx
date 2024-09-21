'use client';

import { RefObject } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { DocumentList } from './document-list';
import { Item } from './item';

import { useDocument } from '@/hooks/use-document';
import { useTrashBin } from '@/store/use-trash-bin';
import { useSearch } from '@/store/use-search';

import {
  IconSquareRoundedPlus,
  IconTrash,
  IconSearch,
  IconLayoutSidebarLeftCollapse,
  IconLogout,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sidebarRef: RefObject<HTMLElementTagNameMap['aside']>;
  isResetting: boolean;
  isMobile: boolean;
  handleCollapse: () => void;
  handleResetWidth: () => void;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Sidebar({
  sidebarRef,
  isMobile,
  isResetting,
  handleCollapse,
  handleMouseDown,
  handleResetWidth,
}: SidebarProps) {
  const openMenu = useTrashBin(state => state.openMenu);
  const openModal = useSearch(state => state.openModal);
  const { handleCreateDocument } = useDocument();
  const { data } = useSession();

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'group w-64 overflow-hidden border-r border-border relative top-0 left-0 z-[99999] lg:z-20',
        isResetting && 'transition-all ease-in-out duration-300',
        isMobile && 'w-0'
      )}
    >
      <div className="bg-card h-full flex flex-col justify-between">
        <div className="space-y-1">
          <div className="space-y-4 pt-4 pb-3 px-3">
            <div className="flex items-center justify-between">
              <Logo />

              <Button onClick={handleCollapse} variant={'ghost'} size={'icon'} className="h-8 w-8">
                <IconLayoutSidebarLeftCollapse size={20} />
              </Button>
            </div>

            <Button
              variant={'outline'}
              size={'sm'}
              className="min-w-full relative text-muted-foreground rounded-lg justify-start gap-2"
              onClick={openModal}
            >
              <IconSearch size={18} />
              <span>Procurar...</span>
              <kbd className="ml-auto pointer-events-none absolute right-[0.3rem] h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">Ctrl+K</span>
              </kbd>
            </Button>
          </div>

          <div>
            <Item
              onClick={handleCreateDocument}
              icon={IconSquareRoundedPlus}
              label="Novo documento"
            />

            <div className="my-2">
              <DocumentList />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Item icon={IconTrash} label="Lixeira" onClick={openMenu} />

          <div className="h-[2px] bg-border mx-3" />

          <div className="px-3 pb-4 w-full flex items-center gap-1">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={data?.user.image!} className="rounded-full" />
              <AvatarFallback>NH</AvatarFallback>
            </Avatar>

            <div className="ml-1 space-y-1 truncate whitespace-nowrap">
              <p className="text-sm leading-none font-medium">
                {data?.user ? data.user.name : 'Nome'}
              </p>
              <p title={data?.user.email!} className="text-xs truncate text-muted-foreground">
                {data?.user ? data.user.email : 'e-mail'}
              </p>
            </div>

            <Button
              onClick={() => signOut()}
              type="submit"
              variant={'ghost'}
              size={'icon'}
              className="ml-auto h-7 w-7"
            >
              <IconLogout size={20} />
            </Button>
          </div>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={handleResetWidth}
          className="h-full w-[2px] bg-border cursor-ew-resize opacity-0 group-hover:opacity-100 transition absolute right-0 top-0"
        />
      </div>
    </aside>
  );
}
