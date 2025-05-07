import { sendEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

type SummaryPayload = {
  users_count: number;
  posts_count: number;
  errors_count: number;
  date: string;
};

export async function POST(req: Request) {
  try {
    const body: SummaryPayload = await req.json();

    const emailText = `
Resumo diário - ${body.date}

👤 Usuários criados: ${body.users_count}
📝 Posts criados: ${body.posts_count}
❗ Erros registrados: ${body.errors_count}
    `.trim();

    await sendEmail({
      to: "test@example.com",
      subject: `Resumo diário - ${body.date}`,
      text: emailText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return new NextResponse("Erro ao enviar e-mail", { status: 500 });
  }
}
