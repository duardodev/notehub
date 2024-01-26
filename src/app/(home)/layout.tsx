import { Header } from '@/app/(home)/components/header';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-[1300px] px-5 py-20">{children}</main>
    </div>
  );
}
