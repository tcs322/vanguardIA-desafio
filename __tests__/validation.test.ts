import { postSchema } from "@/schemas/postSchema";
import { userSchema } from "@/schemas/userSchema";

describe("Validação dos dados com Zod", () => {
  it("valida um usuário válido", () => {
    const result = userSchema.safeParse({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      created_at: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });

  it("falha ao validar um usuário com email inválido", () => {
    const result = userSchema.safeParse({
      id: 1,
      name: "John Doe",
      email: "email-invalido",
      created_at: new Date().toISOString(),
    });

    expect(result.success).toBe(false);
  });

  it("valida um post válido", () => {
    const result = postSchema.safeParse({
      id: 1,
      userId: 1,
      title: "Post Title",
      body: "Post content",
      created_at: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });

  it("falha ao validar um post com campo faltando", () => {
    const result = postSchema.safeParse({
      id: 1,
      userId: 1,
      title: "Post Title",
      // body está faltando
      created_at: new Date().toISOString(),
    });

    expect(result.success).toBe(false);
  });
});
