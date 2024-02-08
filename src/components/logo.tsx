import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={30} height={30} />
      <p className="text-xl font-bold leading-none">NoteHub</p>
    </Link>
  );
}
