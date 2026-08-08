import nodemailer from "nodemailer";

export function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  return Boolean(host && from);
}

export async function sendViaSmtp(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!host || !from) {
    throw new Error("SMTP is not configured (set SMTP_HOST and EMAIL_FROM)");
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const secureExplicit = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureExplicit === "true" || (secureExplicit !== "false" && port === 465);

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  await transport.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
