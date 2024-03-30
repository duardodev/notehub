'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const getDocumentsSchema = z.object({
  id: z.string().optional(),
  parentDocumentId: z.string().optional().nullable(),
});

type getDocumentsType = z.infer<typeof getDocumentsSchema>;

export async function getDocuments(data?: getDocumentsType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const documents = await prisma.document.findMany({
      where: {
        userId,
        parentDocumentId: data?.parentDocumentId,
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

export async function getChildDocuments({ parentDocumentId }: getDocumentsType) {
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

  try {
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
  } catch (error) {
    console.log(error);
  }
}

export async function getDocumentById({ id }: getDocumentsType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const document = prisma.document.findUnique({
      where: {
        id,
        userId,
      },
    });

    return document;
  } catch (error) {
    console.log(error);
  }
}
