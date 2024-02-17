import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const lato = Lato({ weight: '700', variable: '--title-font', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | NoteHub',
    default: 'NoteHub',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={`${inter.className} ${lato.variable} antialiased`}>
        <body>
          <Toaster position="top-center" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
