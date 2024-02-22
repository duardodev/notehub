'use client';

import { RefObject } from 'react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { DocumentList } from './document-list';
import { Item } from './item';
import {
  IconSquareRoundedPlus,
  IconSettings2,
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

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'group w-64 overflow-hidden border-r border-border relative top-0 left-0 z-20',
        isResetting && 'transition-all ease-in-out duration-300',
        isMobile && 'w-0'
      )}
    >
      <div className="bg-background h-full flex flex-col justify-between">
        <div className="space-y-2">
          <div className="space-y-4 p-3">
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

          <div className="space-y-1">
            <h2 className="font-medium text-muted-foreground text-sm px-3">Menu</h2>

            <div>
              <Item icon={IconSettings2} label="Configurações" />
              <Item icon={IconSquareRoundedPlus} label="Novo documento" />
              <DocumentList />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Item icon={IconTrash} label="Lixeira" />

          <div className="h-px bg-border mx-3" />

          <div className="px-3 pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>NH</AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <p className="text-sm whitespace-nowrap leading-none font-medium">
                  {user ? user.firstName + (user.lastName ? ` ${user.lastName}` : '') : 'Nome'}
                </p>
                <p
                  title={user?.emailAddresses[0].emailAddress}
                  className="w-36 text-xs whitespace-nowrap truncate text-muted-foreground"
                >
                  {user ? user.emailAddresses[0].emailAddress : 'e-mail'}
                </p>
              </div>
            </div>

            <SignOutButton>
              <Button variant={'ghost'} size={'icon'} className="h-8 w-8">
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
