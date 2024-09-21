'use server';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const archiveDocumentSchema = z.object({
  id: z.string().optional(),
});

type archiveDocumentType = z.infer<typeof archiveDocumentSchema>;

export async function archiveDocument({ id }: archiveDocumentType) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const existingDocument = await prisma.document.findUnique({
      where: {
        userId: session.user.id,
        id,
      },
    });

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== session.user.id) {
      throw new Error('Unauthorized');
    }

    const document = await prisma.document.update({
      where: {
        userId: session.user.id,
        id,
      },
      data: {
        isArchived: true,
      },
    });

    await archiveChildDocuments(id);

    return document;
  } catch (error) {
    console.log(error);
  }
}

async function archiveChildDocuments(id?: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const children = await prisma.document.findMany({
      where: {
        userId: session.user.id,
        parentDocumentId: id,
      },
    });

    for (const child of children) {
      await prisma.document.update({
        where: {
          id: child.id,
        },
        data: {
          isArchived: true,
        },
      });

      await archiveChildDocuments(child.id);
    }
  } catch (error) {
    console.log(error);
  }
}
