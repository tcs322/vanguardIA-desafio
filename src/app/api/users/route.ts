import { getUsers } from "@/lib/fetchUsers";
import { formatUsers } from "@/lib/formatUsers";
import { saveUsers } from "@/lib/saveUsers";
import { userSchema } from "@/schemas/userSchema";
import { saveError } from "@/lib/saveError";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
    return new Response("Erro ao buscar os usuários", { status: 500 });
  }
}

export async function POST() {
  try {
    const users = await getUsers();
    const formattedUsers = formatUsers(users);

    const usersArraySchema = z.array(userSchema);
    const validatingUsers = usersArraySchema.safeParse(formattedUsers);

    if (!validatingUsers.success) {
      const errorMessage = JSON.stringify(
        validatingUsers.error.format,
        null,
        2
      );
      const rawData = JSON.stringify(formattedUsers);

      await saveError({
        message: errorMessage,
        raw_data: rawData,
      });

      return new Response("Dados inválidos para usuários", { status: 400 });
    }

    await saveUsers(validatingUsers.data);

    return new Response("Usuários salvos com sucesso!", { status: 201 });
  } catch (error) {
    await saveError({
      message: error instanceof Error ? error.message : "Erro desconhecido",
      raw_data: "",
    });

    return new Response("Erro ao salvar os usuários", { status: 500 });
  }
}
