'use server';

import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const deleteDocumentSchema = z.object({
  id: z.string().optional(),
});

type deleteDocumentType = z.infer<typeof deleteDocumentSchema>;

export async function deleteDocument({ id }: deleteDocumentType) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const document = await prisma.document.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return document;
  } catch (error) {
    console.log(error);
  }
}
