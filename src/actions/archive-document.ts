'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const archiveDocumentSchema = z.object({
  id: z.string().optional(),
});

type archiveDocumentType = z.infer<typeof archiveDocumentSchema>;

export async function archiveDocument({ id }: archiveDocumentType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const existingDocument = await prisma.document.findUnique({
      where: {
        userId,
        id,
      },
    });

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const document = await prisma.document.update({
      where: {
        userId,
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
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const children = await prisma.document.findMany({
      where: {
        userId,
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
