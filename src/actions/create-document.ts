'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const createDocumetSchema = z.object({
  title: z.string(),
  parentDocumentId: z.string().optional(),
});

type createDocumentType = z.infer<typeof createDocumetSchema>;

export async function createDocument({ title, parentDocumentId }: createDocumentType) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  try {
    const document = await prisma.document.create({
      data: {
        userId: session.user.id as string,
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
