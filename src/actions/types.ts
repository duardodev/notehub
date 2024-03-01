import { z } from 'zod';

const createDocumetSchema = z.object({
  title: z.string(),
  parentDocumentId: z.string().optional(),
});

const getDocumentsSchema = z.object({
  parentDocumentId: z.string(),
});

const archiveDocumentSchema = z.object({
  documentId: z.string().optional(),
});

export type createDocumentType = z.infer<typeof createDocumetSchema>;
export type getDocumentsType = z.infer<typeof getDocumentsSchema>;
export type archiveDocumentType = z.infer<typeof archiveDocumentSchema>;
