'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { createDocumentType, getDocumentsType } from './types';

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
        userId: userId,
        parentDocumentId: null,
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
    });

    return documents;
  } catch (error) {
    console.log(error);
  }
}
