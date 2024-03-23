import Link from 'next/link';
import { Metadata } from 'next';
import { ClerkLoading, ClerkLoaded, SignedOut, SignInButton, SignedIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Illustrations } from './components/illustrations';
import { LogIn } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
        <div className="max-w-[790px] mx-auto space-y-6  sm:space-y-7">
          <h1 className="text-4xl sm:text-5xl text-center font-bold font-title">
            Suas Ideias, Documentos, & <br /> Planos. Unificados. <br /> Bem-vindo ao{' '}
            <span className="text-primary underline underline-offset-8">NoteHub.</span>
          </h1>

          <p className="max-w-[520px] mx-auto text-lg sm:text-xl font-medium text-center">
            O NoteHub é o lugar onde tudo acontece de maneira mais organizada, rápida e eficiente!
          </p>
        </div>

        <ClerkLoading>
          <LoadingSpinner />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedOut>
            <SignInButton redirectUrl="/documents" mode="modal">
              <Button className="gap-2 sm:px-5 sm:text-base">
                Entrar
                <LogIn size={20} />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button className="gap-3 rounded-sm sm:px-5 sm:text-base" asChild>
              <Link href="/documents">
                Entrar
                <LogIn size={20} />
              </Link>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>

      <Illustrations />
    </div>
  );
}
