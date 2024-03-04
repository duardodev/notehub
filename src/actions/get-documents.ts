'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const getDocumentsSchema = z.object({
  parentDocumentId: z.string().optional(),
});

type getChildDocumentsType = z.infer<typeof getDocumentsSchema>;

export async function getDocuments() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const documents = await prisma.document.findMany({
      where: {
        userId,
        parentDocumentId: null,
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return documents;
  } catch (error) {
    console.log(error);
  }
}

export async function getChildDocuments({ parentDocumentId }: getChildDocumentsType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const documents = await prisma.document.findMany({
      where: {
        userId,
        parentDocumentId,
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return documents;
  } catch (error) {
    console.log(error);
  }
}

export async function getArchivedDocuments() {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const documents = prisma.document.findMany({
    where: {
      userId,
      isArchived: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return documents;
}
