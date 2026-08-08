import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSessionUserId } from "@/server/auth/require-session";
import { createConversation } from "@/server/conversations/create-conversation";

const createConversationBodySchema = z.object({
  characterId: z.string().min(1),
});

export async function POST(request: Request) {
  const { userId, unauthorized } = await requireSessionUserId();
  if (!userId) {
    return unauthorized;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createConversationBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const conversation = await createConversation(
    userId,
    parsed.data.characterId,
  );

  if (!conversation) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  return NextResponse.json({ conversation }, { status: 201 });
}
