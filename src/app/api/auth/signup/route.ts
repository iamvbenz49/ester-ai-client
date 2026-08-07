import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/email";
import { hashPassword } from "@/lib/password";
import { signupBodySchema } from "@/lib/validators/auth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = signupBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL?.trim()) {
    console.error("[signup] DATABASE_URL is not set");
    return NextResponse.json(
      { error: "Sign-up is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const email = normalizeEmail(parsed.data.email);

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An account with this email already exists. Try signing in instead.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(parsed.data.password);

    const user = await prisma.user.create({
      data: {
        email,
        name: parsed.data.name?.trim() || null,
        passwordHash,
      },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("[signup]", error);
    return NextResponse.json(
      { error: "Could not create your account. Please try again." },
      { status: 500 },
    );
  }
}
