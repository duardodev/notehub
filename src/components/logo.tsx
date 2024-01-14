import Link from 'next/link';
import { IconNotebook } from '@tabler/icons-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <IconNotebook size={26} />
      <p className="text-xl font-bold">NoteHub</p>
    </Link>
  );
}
