'use server';

import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const getDocumentsSchema = z.object({
  id: z.string().optional(),
  parentDocumentId: z.string().optional().nullable(),
});

type getDocumentsType = z.infer<typeof getDocumentsSchema>;

export async function getDocuments(data?: getDocumentsType) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id,
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
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id,
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
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const documents = prisma.document.findMany({
      where: {
        userId: session.user.id,
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
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const document = prisma.document.findUnique({
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
