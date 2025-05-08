import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  created_at: z.string().datetime().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
