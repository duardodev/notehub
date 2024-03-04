'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { archiveDocumentType, createDocumentType, getDocumentsType } from './types';

export async function createDocument({ title, parentDocumentId }: createDocumentType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const document = await prisma.document.create({
      data: {
        userId,
        title,
        parentDocumentId,
        isArchived: false,
        isPublished: false,
      },
    });

    return document;
  } catch (error) {
    console.log(error);
  }
}

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

export async function archiveDocument({ documentId }: archiveDocumentType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const existingDocument = await prisma.document.findUnique({
      where: {
        userId,
        id: documentId,
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
        id: documentId,
      },
      data: {
        isArchived: true,
      },
    });

    await archiveChildDocuments(documentId);

    return document;
  } catch (error) {
    console.log(error);
  }
}

async function archiveChildDocuments(parentDocumentId?: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const children = await prisma.document.findMany({
      where: {
        userId,
        parentDocumentId,
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
