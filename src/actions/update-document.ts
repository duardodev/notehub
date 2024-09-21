'use server';

import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const updateDocumentSchema = z.object({
  id: z.string().optional(),
  parentDocumentId: z.string().optional().nullable(),
  title: z.string().optional(),
  icon: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
});

type updateDocumentType = z.infer<typeof updateDocumentSchema>;

export async function updateDocument({ id, parentDocumentId, ...values }: updateDocumentType) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const existingDocument = await prisma.document.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingDocument) {
      throw new Error('Not found');
    }

    if (existingDocument.userId !== session.user.id) {
      throw new Error('Unauthorized');
    }

    const document = await prisma.document.update({
      where: {
        id,
        parentDocumentId,
        userId: session.user.id,
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
