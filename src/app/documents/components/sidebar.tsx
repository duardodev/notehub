'use client';

import { RefObject } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { DocumentList } from './document-list';
import { Setting } from './setting';
import { Item } from './item';

import { SignOutButton, useUser } from '@clerk/nextjs';
import { useTrashBox } from '@/store/use-trash-box';
import {
  IconSquareRoundedPlus,
  IconTrash,
  IconSearch,
  IconLogout,
  IconLayoutSidebarLeftCollapse,
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
  const { user } = useUser();
  const openMenu = useTrashBox(state => state.openMenu);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'group w-64 overflow-hidden border-r border-border relative top-0 left-0 z-20',
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
            >
              <IconSearch size={18} />
              <span>Procurar...</span>
              <kbd className="ml-auto pointer-events-none absolute right-[0.3rem] h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">Ctrl+K</span>
              </kbd>
            </Button>
          </div>

          <div>
            <Setting />
            <Item icon={IconSquareRoundedPlus} label="Novo documento" />

            <div className="my-2">
              <DocumentList />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Item icon={IconTrash} label="Lixeira" onClick={openMenu} />

          <div className="h-[2px] bg-border mx-3" />

          <div className="px-3 pb-4 w-full flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>NH</AvatarFallback>
            </Avatar>

            <div className="ml-1 space-y-1 truncate whitespace-nowrap">
              <p className="text-sm leading-none font-medium">
                {user ? user.firstName + (user.lastName ? ` ${user.lastName}` : '') : 'Nome'}
              </p>
              <p
                title={user?.emailAddresses[0].emailAddress}
                className="text-xs truncate text-muted-foreground"
              >
                {user ? user.emailAddresses[0].emailAddress : 'e-mail'}
              </p>
            </div>

            <SignOutButton>
              <Button variant={'ghost'} size={'icon'} className="ml-auto h-7 w-7">
                <IconLogout size={20} />
              </Button>
            </SignOutButton>
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
