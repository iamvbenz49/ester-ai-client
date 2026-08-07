import { NextResponse } from "next/server";
import { signIn } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const base = process.env.AUTH_URL ?? "http://localhost:3000";

  if (!token) {
    return NextResponse.redirect(
      new URL("/login?error=InvalidLink", base),
    );
  }

  try {
    await signIn("credentials", {
      magicToken: token,
      redirectTo: "/",
    });
  } catch (error) {
    const digest =
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest?: string }).digest === "string"
        ? (error as { digest: string }).digest
        : "";

    if (digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return NextResponse.redirect(
      new URL("/login?error=InvalidLink", base),
    );
  }

  return NextResponse.redirect(new URL("/", base));
}
