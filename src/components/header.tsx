import { IconSunHigh } from '@tabler/icons-react';
import { LogIn } from 'lucide-react';
import { Logo } from './logo';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="h-20 mx-auto max-w-[1200px] px-4 flex items-center justify-between">
      <Logo />

      <div className="flex gap-3">
        <Button variant={'outline'} className="gap-2 max-[375px]:hidden">
          Fazer Login
          <LogIn size={20} />
        </Button>

        <Button variant={'outline'} size={'icon'} className="min-[376px]:hidden">
          <LogIn size={20} />
        </Button>

        <Button variant={'outline'} size={'icon'}>
          <IconSunHigh size={24} />
        </Button>
      </div>
    </header>
  );
}
