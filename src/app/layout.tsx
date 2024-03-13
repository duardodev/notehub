import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

import { ReactQueryClientProvider } from '@/lib/query-client';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';
import { Toaster } from 'sonner';

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
    <ClerkProvider localization={ptBR}>
      <html
        lang="pt-BR"
        suppressHydrationWarning
        className={`${inter.className} ${lato.variable} antialiased`}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="notehub-theme"
          >
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
