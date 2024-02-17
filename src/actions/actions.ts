'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { createDocumentType } from './types';

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
