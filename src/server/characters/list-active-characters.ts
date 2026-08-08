import { prisma } from "@/lib/prisma";
import { characterPublicSelect } from "./character-public";

export async function listActiveCharacters() {
  return prisma.character.findMany({
    where: { isActive: true },
    select: characterPublicSelect,
    orderBy: { name: "asc" },
  });
}
