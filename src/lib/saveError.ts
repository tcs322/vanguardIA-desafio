import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveError(error: { message: string; raw_data: string }) {
  try {
    const safeId = Math.floor(Math.random() * 2_000_000_000);
    await prisma.error.create({
      data: {
        id: safeId,
        message: error.message,
        raw_data: error.raw_data,
      },
    });
  } catch (err) {
    console.error("Erro ao salvar na tabela de erros:", err);
  } finally {
    await prisma.$disconnect();
  }
}
