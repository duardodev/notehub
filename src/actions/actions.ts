'use server';

import prisma from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs';
import { createDocumentType, getDocumentsType } from './types';

export async function createDocument(data: createDocumentType) {
  const user = await currentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  try {
    const document = await prisma.document.create({
      data: {
        userId: user?.id,
        title: data.title,
        isArchived: false,
        isPublished: false,
        parentDocumentId: data.parentDocumentId,
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
    const documents: getDocumentsType[] = await prisma.document.findMany({
      where: {
        userId: userId,
      },
    });

    return documents;
  } catch (error) {
    console.log(error);
  }
}
