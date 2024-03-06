'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const deleteDocumentSchema = z.object({
  id: z.string().optional(),
});

type deleteDocumentType = z.infer<typeof deleteDocumentSchema>;

export async function deleteDocument({ id }: deleteDocumentType) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  try {
    const document = await prisma.document.delete({
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
