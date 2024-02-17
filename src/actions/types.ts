import { z } from 'zod';

const createDocumetSchema = z.object({
  title: z.string(),
  parentDocumentId: z.string().optional(),
});

export type createDocumentType = z.infer<typeof createDocumetSchema>;
