import { prisma } from "@/lib/prisma";

export async function createConversation(userId: string, characterId: string) {
  const character = await prisma.character.findFirst({
    where: { id: characterId, isActive: true },
    select: { id: true },
  });

  if (!character) {
    return null;
  }

  return prisma.conversation.create({
    data: {
      userId,
      characterId,
    },
    select: {
      id: true,
      characterId: true,
      createdAt: true,
    },
  });
}
