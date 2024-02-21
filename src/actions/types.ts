import { z } from 'zod';

const createDocumetSchema = z.object({
  title: z.string(),
  parentDocumentId: z.string().optional(),
});

const getDocumentsSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export type createDocumentType = z.infer<typeof createDocumetSchema>;
export type getDocumentsType = z.infer<typeof getDocumentsSchema>;
