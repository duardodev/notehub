'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const createDocumetSchema = z.object({
  title: z.string(),
  parentDocumentId: z.string().optional(),
});

type createDocumentType = z.infer<typeof createDocumetSchema>;

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
