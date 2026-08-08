import { prisma } from "@/lib/prisma";
import { characterPublicSelect } from "@/server/characters/character-public";

export async function getConversationForUser(
  conversationId: string,
  userId: string,
) {
  return prisma.conversation.findFirst({
    where: { id: conversationId, userId },
    select: {
      id: true,
      createdAt: true,
      character: {
        select: characterPublicSelect,
      },
    },
  });
}
