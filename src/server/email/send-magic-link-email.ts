import { isSmtpConfigured, sendViaSmtp } from "@/server/email/send-via-smtp";

const MAGIC_LINK_SUBJECT = "Your sign-in link";

function magicLinkHtml(signInUrl: string): string {
  return `<p><a href="${signInUrl}">Sign in to your account</a></p><p>This link expires in 15 minutes. If you did not request this, you can ignore this email.</p>`;
}

export async function sendMagicLinkEmail(to: string, signInUrl: string): Promise<void> {
  const subject = MAGIC_LINK_SUBJECT;
  const html = magicLinkHtml(signInUrl);

  if (isSmtpConfigured()) {
    try {
      await sendViaSmtp({ to, subject, html });
    } catch (error) {
      console.error("[magic-link] SMTP error:", error);
      throw new Error("Failed to send sign-in email");
    }
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info(
      "[magic-link] Email not configured (set SMTP_HOST and EMAIL_FROM). Sign-in link:",
      signInUrl,
    );
    return;
  }

  console.error("[magic-link] Email is not configured (set SMTP_HOST and EMAIL_FROM)");
  throw new Error("Email is not configured");
}
