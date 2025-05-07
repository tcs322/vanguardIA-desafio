import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int(), // obrigatório pois vem da API externa
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

export type UserSchema = z.infer<typeof userSchema>;
