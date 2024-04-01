import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Heading } from './components/heading';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Illustrations } from './components/illustrations';
import { ClerkLoading, ClerkLoaded, SignedOut, SignInButton, SignedIn } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
        <Heading />

        <ClerkLoading>
          <LoadingSpinner />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedOut>
            <SignInButton redirectUrl="/documents" mode="modal">
              <Button className="gap-2 px-4 sm:text-base">
                Entrar
                <LogIn size={20} />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button className="gap-3 px-4 sm:text-base" asChild>
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
