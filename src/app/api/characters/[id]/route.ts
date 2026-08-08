import { NextResponse } from "next/server";
import { requireSessionUserId } from "@/server/auth/require-session";
import { getActiveCharacterById } from "@/server/characters/get-active-character-by-id";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { userId, unauthorized } = await requireSessionUserId();
  if (!userId) {
    return unauthorized;
  }

  const { id } = await context.params;
  const character = await getActiveCharacterById(id);

  if (!character) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  return NextResponse.json({ character });
}
