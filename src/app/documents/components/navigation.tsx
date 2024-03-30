'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toogle';

export function Navigation() {
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const isResizingRef = useRef(false);

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      handleResetWidth();
      setIsResetting(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    }
  }, [pathname, isMobile]);

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 256) newWidth = 256;
    if (newWidth > 420) newWidth = 420;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;

      if (!isMobile) {
        navbarRef.current.style.setProperty('left', `${newWidth}px`);
        navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
      }
    }
  }

  function handleMouseUp() {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  function handleCollapse() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.width = '100%';
      navbarRef.current.style.left = '0';
    }
  }

  function handleResetWidth() {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);

      sidebarRef.current.style.width = '256px';
      navbarRef.current.style.setProperty('width', isMobile ? '100%' : 'calc(100% - 256px)');
      navbarRef.current.style.setProperty('left', isMobile ? '0' : '256px');
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <div
        className={cn(
          'bg-gray-500 w-screen h-screen opacity-0 visible md:hidden fixed left-0 right-0 top-0 z-20 transition-opacity ease-in-out duration-300',
          !isCollapsed && 'opacity-40',
          isCollapsed && 'hidden'
        )}
      />

      <Sidebar
        sidebarRef={sidebarRef}
        isMobile={isMobile}
        isResetting={isResetting}
        handleCollapse={handleCollapse}
        handleResetWidth={handleResetWidth}
        handleMouseDown={handleMouseDown}
      />

      <div
        ref={navbarRef}
        className={cn(
          'w-[calc(100%-256px)] absolute top-0 left-64 z-10',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} handleResetWidth={handleResetWidth} />
        ) : (
          <nav className="w-full px-3 py-3.5 flex items-center justify-between gap-10">
            {isCollapsed ? (
              <Button
                onClick={handleResetWidth}
                variant={'ghost'}
                size={'icon'}
                className="h-8 w-8"
              >
                <IconLayoutSidebarLeftExpand size={20} />
              </Button>
            ) : (
              <div />
            )}

            <ThemeToggle />
          </nav>
        )}
      </div>
    </>
  );
}
