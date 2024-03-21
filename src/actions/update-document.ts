'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const updateDocumentSchema = z.object({
  id: z.string().optional(),
  parentDocumentId: z.string().optional().nullable(),
  title: z.string().optional(),
  icon: z.string().optional().nullable(),
});

type updateDocumentType = z.infer<typeof updateDocumentSchema>;

export async function updateDocument({ id, parentDocumentId, ...values }: updateDocumentType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const existingDocument = await prisma.document.findUnique({
      where: {
        id,
        userId,
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
        id,
        parentDocumentId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return document;
  } catch (error) {
    console.log(error);
  }
}
