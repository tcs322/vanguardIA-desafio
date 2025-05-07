import { prisma } from "@/lib/prisma"; // ajuste esse import conforme a sua estrutura

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        id: "desc",
      },
      take: 10,
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar os posts recentes:", error);
    return new Response("Erro ao buscar os posts recentes", { status: 500 });
  }
}
