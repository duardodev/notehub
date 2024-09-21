import { Metadata } from 'next';
import { Heading } from './components/heading';
import { Illustrations } from './components/illustrations';
import { SignInButton } from './components/sign-in-button';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-center gap-5 sm:gap-6">
        <Heading />
        <SignInButton />
      </div>

      <Illustrations />
    </div>
  );
}
