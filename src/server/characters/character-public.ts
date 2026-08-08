import type { Prisma } from "@prisma/client";

export const characterPublicSelect = {
  id: true,
  slug: true,
  name: true,
  avatarUrl: true,
  greeting: true,
} satisfies Prisma.CharacterSelect;

export type CharacterPublic = Prisma.CharacterGetPayload<{
  select: typeof characterPublicSelect;
}>;
