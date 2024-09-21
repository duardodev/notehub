import Image from 'next/image';
import { CreateDocumentButton } from './components/create-document-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Documents() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image
        src="/engineer.svg"
        alt="Documents"
        priority
        width={320}
        height={320}
        className="dark:hidden mb-2"
      />

      <Image
        src="/engineer-dark.svg"
        alt="Documents"
        priority
        width={320}
        height={320}
        className="hidden dark:block"
      />

      <h1 className="text-lg font-medium">
        {session.user ? `${session.user.name}, bem-vindo ao NoteHub!` : 'Bem-vindo ao NoteHub!'}
      </h1>

      <CreateDocumentButton />
    </div>
  );
}
