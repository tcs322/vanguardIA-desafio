import type { FormatedUsers } from "./formatUsers";
import { PrismaClient } from "@prisma/client";

export async function saveUsers(users: FormatedUsers[]) {
  const prisma = new PrismaClient();
  try {
    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("Erro ao salvar os usuários:", error);
    throw new Error("Falha ao salvar os usuários");
  } finally {
    await prisma.$disconnect();
  }
}
