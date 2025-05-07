import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const error = await prisma.error.findMany();

    return new Response(JSON.stringify(error), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
    return new Response("Erro ao buscar os usuários", { status: 500 });
  }
}
