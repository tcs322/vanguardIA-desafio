import { z } from "zod";

export const postSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  title: z.string().min(1, "Título é obrigatório"),
  body: z.string().min(1, "Corpo é obrigatório"),
});

export type PostSchema = z.infer<typeof postSchema>;
