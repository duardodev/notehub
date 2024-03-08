'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { log } from 'console';
import { z } from 'zod';

const restoreDocumentSchema = z.object({
  id: z.string().optional(),
});

type restoreDocumentType = z.infer<typeof restoreDocumentSchema>;

export async function restoreDocument({ id }: restoreDocumentType) {
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

    const parentDocumentIsArchived = await prisma.document.findUnique({
      where: {
        id,
        userId,
        parentDocumentId: existingDocument?.parentDocumentId,
        isArchived: true,
      },
    });

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const documentUpdated: Partial<{ parentDocumentId: string | null; isArchived: boolean }> = {
      isArchived: false,
    };

    if (existingDocument.parentDocumentId) {
      const parentDocument = await prisma.document.findUnique({
        where: {
          userId,
          id: existingDocument.parentDocumentId,
        },
      });

      if (parentDocument?.isArchived) {
        documentUpdated.parentDocumentId = null;
      }
    }

    const document = await prisma.document.update({
      where: {
        userId,
        id,
      },
      data: documentUpdated,
    });

    await restoreChildDocuments(id);

    return document;
  } catch (error) {
    console.log(error);
  }
}

async function restoreChildDocuments(id?: string) {
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
          isArchived: false,
        },
      });

      await restoreChildDocuments(child.id);
    }
  } catch (error) {
    console.log(error);
  }
}
