import Image from 'next/image';
import { CreateDocumentButton } from './components/create-document-button';
import { currentUser } from '@clerk/nextjs';

export default async function Documents() {
  const user = await currentUser();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image src="/paper-documents.svg" alt="Documents" width={320} height={320} />

      <h1 className="text-lg font-medium">
        {user ? `${user.firstName}, bem-vindo ao NoteHub!` : 'Bem-vindo ao NoteHub!'}
      </h1>

      <CreateDocumentButton />
    </div>
  );
}
