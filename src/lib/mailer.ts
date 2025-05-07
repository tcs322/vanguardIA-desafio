import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER as string,
    pass: process.env.MAILTRAP_PASS as string,
  },
});

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: SendEmailParams) {
  await transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to,
    subject,
    text,
  });
}
