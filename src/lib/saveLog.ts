import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveLog(log: { event_type: string }) {
  try {
    const safeId = Math.floor(Math.random() * 2_000_000_000);
    await prisma.log.create({
      data: {
        id: safeId,
        event_type: log.event_type,
      },
    });
  } catch (error) {
    console.log("Erro ao salvar na tabela de logs", error);
  } finally {
    await prisma.$disconnect();
  }
}
