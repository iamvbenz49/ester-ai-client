import { NextResponse } from "next/server";
import { z } from "zod";
import { createMagicLinkForEmail } from "@/server/auth/magic-link";

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

  const { url } = await createMagicLinkForEmail(parsed.data.email);

  if (process.env.NODE_ENV === "development") {
    console.info("[magic-link] Sign-in link:", url);
  }

  return NextResponse.json({
    ok: true,
    message: "If an account exists for that email, we sent a sign-in link.",
  });
}
