import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers } from './providers';

import './globals.css';

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
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.className} ${lato.variable} antialiased`}
    >
      <body>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
