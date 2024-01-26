import { Header } from '@/app/(home)/components/header';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-[1300px] px-5 py-16">{children}</main>
    </div>
  );
}
