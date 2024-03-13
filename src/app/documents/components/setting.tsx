'use client';

import { Dialog, DialogContentCustom, DialogTrigger } from '@/components/ui/dialog';
import { Item } from './item';
import { IconSettings2 } from '@tabler/icons-react';
import { UserProfile } from '@clerk/nextjs';

export function Setting() {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <div>
          <Item icon={IconSettings2} label="Configuração" />
        </div>
      </DialogTrigger>
      <DialogContentCustom>
        <UserProfile
          appearance={{
            elements: {
              rootBox: 'h-max mx-auto',
              card: 'h-[calc(100vh_-_6rem)] max-h-[44rem] w-[inherit] mx-auto',
            },
          }}
        />
      </DialogContentCustom>
    </Dialog>
  );
}
