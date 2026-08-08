import { NextResponse } from "next/server";
import { requireSessionUserId } from "@/server/auth/require-session";
import { listActiveCharacters } from "@/server/characters/list-active-characters";

export async function GET() {
  const { userId, unauthorized } = await requireSessionUserId();
  if (!userId) {
    return unauthorized;
  }

  const characters = await listActiveCharacters();
  return NextResponse.json({ characters });
}
