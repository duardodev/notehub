import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const lato = Lato({ weight: '700', variable: '--title-font', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | NoteHub',
    default: 'NoteHub'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${lato.variable} dark antialiased`}>{children}</body>
    </html>
  );
}
