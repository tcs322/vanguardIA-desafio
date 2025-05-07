import { getPosts } from "@/lib/fetchPosts";
import { prisma } from "@/lib/prisma";
import { saveError } from "@/lib/saveError";
import { savePosts } from "@/lib/savePosts";
import { postSchema } from "@/schemas/postSchema";
import { z } from "zod";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar os posts:", error);
    return new Response("Erro ao buscar os posts", { status: 500 });
  }
}

export async function POST() {
  try {
    const posts = await getPosts();

    const postsArraySchema = z.array(postSchema);
    const validatingPosts = postsArraySchema.safeParse(posts);

    if (!validatingPosts.success) {
      const errorMessage = JSON.stringify(
        validatingPosts.error.format,
        null,
        2
      );
      const rawData = JSON.stringify(posts);

      await saveError({
        message: errorMessage,
        raw_data: rawData,
      });

      return new Response("Dados inválidos para posts", { status: 400 });
    }

    await savePosts(validatingPosts.data);
    return new Response("Posts salvos com sucesso!", { status: 201 });
  } catch (error) {
    await saveError({
      message: error instanceof Error ? error.message : "Erro desconhecido",
      raw_data: "",
    });

    return new Response("Erro ao salvar posts", { status: 500 });
  }
}
