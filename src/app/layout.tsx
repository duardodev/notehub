import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from '@/app/(home)/components/header';
import { ptBR } from '@clerk/localizations';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ weight: '700', variable: '--title-font', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | NoteHub',
    default: 'NoteHub',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={`${inter.className} ${lato.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
