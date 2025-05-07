import { PrismaClient } from "@prisma/client";
import type { Post } from "./fetchPosts";

export async function savePosts(posts: Post[]) {
  const prisma = new PrismaClient();
  try {
    await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("Erro ao salvar posts:", error);
    throw new Error("Falha ao salvar posts");
  } finally {
    await prisma.$disconnect();
  }
}
