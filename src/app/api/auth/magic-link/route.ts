import { NextResponse } from "next/server";
import { z } from "zod";
import { createMagicLinkForEmail } from "@/server/auth/magic-link";
import { sendMagicLinkEmail } from "@/server/email/send-magic-link-email";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  try {
    const { url } = await createMagicLinkForEmail(parsed.data.email);
    await sendMagicLinkEmail(parsed.data.email, url);
  } catch (error) {
    console.error("[magic-link]", error);
    return NextResponse.json(
      { error: "Could not send a sign-in link. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "If an account exists for that email, we sent a sign-in link.",
  });
}
