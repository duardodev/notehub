'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CoverProps {
  url?: string | null | undefined;
}

export function Cover({ url }: CoverProps) {
  return (
    <div className={cn('h-[35vh] w-full relative', url && 'bg-muted')}>
      {!!url && <Image src={url} fill alt="Capa" className="object-cover" />}
    </div>
  );
}
