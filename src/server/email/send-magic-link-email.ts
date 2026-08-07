const RESEND_API_URL = "https://api.resend.com/emails";

export async function sendMagicLinkEmail(to: string, signInUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.EMAIL_FROM?.trim() ?? (apiKey ? "onboarding@resend.dev" : undefined);

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[magic-link] Email not configured (set RESEND_API_KEY and EMAIL_FROM). Sign-in link:",
        signInUrl,
      );
      return;
    }
    console.error("[magic-link] RESEND_API_KEY or EMAIL_FROM is not set");
    throw new Error("Email is not configured");
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Your sign-in link",
      html: `<p><a href="${signInUrl}">Sign in to your account</a></p><p>This link expires in 15 minutes. If you did not request this, you can ignore this email.</p>`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[magic-link] Resend API error:", response.status, body);
    throw new Error("Failed to send sign-in email");
  }
}
