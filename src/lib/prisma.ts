// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Usar um cache para não criar múltiplas instâncias em desenvolvimento
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Log detalhado para debug
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
