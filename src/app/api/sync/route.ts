import { userSchema } from "@/schemas/userSchema";
import { postSchema } from "@/schemas/postSchema";
import { saveUsers } from "@/lib/saveUsers";
import { savePosts } from "@/lib/savePosts";
import { saveError } from "@/lib/saveError";
import { sendEmail } from "@/lib/mailer";
import { z } from "zod";
import { saveLog } from "@/lib/saveLog";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const usersRaw = body.users;
    const postsRaw = body.posts;

    const userArraySchema = z.array(userSchema);
    const postArraySchema = z.array(postSchema);

    const usersValidation = userArraySchema.safeParse(usersRaw);
    const postsValidation = postArraySchema.safeParse(postsRaw);

    const summary: string[] = [];

    if (usersValidation.success) {
      await saveUsers(usersValidation.data);
      await saveLog({
        event_type: `new_users: ${usersValidation.data.length} usuários salvos com sucesso.`,
      });
      summary.push(
        `🟢 ${usersValidation.data.length} usuários salvos com sucesso.`
      );
    } else {
      const errorMessage = JSON.stringify(
        usersValidation.error.format(),
        null,
        2
      );
      await saveError({
        message: errorMessage,
        raw_data: JSON.stringify(usersRaw),
      });
      summary.push(`🔴 Falha ao validar usuários.`);
    }

    if (postsValidation.success) {
      await savePosts(postsValidation.data);
      await saveLog({
        event_type: `new_posts: ${postsValidation.data.length} posts salvos com sucesso.`,
      });
      summary.push(
        `🟢 ${postsValidation.data.length} posts salvos com sucesso.`
      );
    } else {
      const errorMessage = JSON.stringify(
        postsValidation.error.format(),
        null,
        2
      );
      await saveError({
        message: errorMessage,
        raw_data: JSON.stringify(postsRaw),
      });
      summary.push(`🔴 Falha ao validar posts.`);
    }

    await sendEmail({
      to: "test@exemple.com",
      subject: "Resumo da sincronização de dados",
      text: summary.join("\n"),
    });

    return new Response(summary.join("\n"), { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";

    await saveError({ message, raw_data: "" });

    await sendEmail({
      to: "test@exemple.com",
      subject: "Erro crítico na sincronização",
      text: `Erro inesperado durante o processo de sincronização:\n${message}`,
    });

    return new Response("Erro ao processar os dados", { status: 500 });
  }
}
