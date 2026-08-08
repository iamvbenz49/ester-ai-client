import { prisma } from "@/lib/prisma";
import { characterPublicSelect } from "./character-public";

export async function getActiveCharacterById(id: string) {
  return prisma.character.findFirst({
    where: { id, isActive: true },
    select: characterPublicSelect,
  });
}
