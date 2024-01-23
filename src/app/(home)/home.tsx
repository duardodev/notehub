'use client';

import Image from 'next/image';
import { SignedIn, SignedOut, ClerkLoading, ClerkLoaded, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
        <div className="max-w-[790px] mx-auto space-y-6  sm:space-y-7">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-bold font-title">
            Suas Ideias, Documentos, & <br /> Planos. Unificados. <br /> Bem-vindo ao{' '}
            <span className="text-primary underline underline-offset-8">NoteHub.</span>
          </h1>

          <p className="max-w-[570px] mx-auto text-lg sm:text-xl md:text-2xl font-medium text-center">
            O NoteHub é o lugar onde tudo acontece de maneira mais organizada, rápida e eficiente!
          </p>
        </div>

        <ClerkLoading>
          <IconLoader2 className="animate-spin" size={24} />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedOut>
            <SignInButton redirectUrl="/documents" mode="modal">
              <Button className="gap-2 sm:h-11 sm:px-6 sm:text-base">
                Entrar
                <LogIn size={20} />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/documents">
              <Button className="gap-2 sm:h-11 sm:px-6 sm:text-base">
                Entrar
                <LogIn size={20} />
              </Button>
            </Link>
          </SignedIn>
        </ClerkLoaded>
      </div>

      <div className="flex items-center justify-center gap-56">
        <Image
          src="/work-from-home.svg"
          alt="Documents"
          width={400}
          height={400}
          className="hidden lg:block"
        />

        <Image src="/paper-documents.svg" alt="Documents" width={400} height={400} />
      </div>
    </div>
  );
}
