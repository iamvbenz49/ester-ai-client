import { prisma } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/email";

type DbUser = Awaited<ReturnType<typeof prisma.user.create>>;

export async function findOrCreateUserForMagicLink(
  email: string,
): Promise<DbUser> {
  const normalized = normalizeEmail(email);
  const existing = await prisma.user.findUnique({
    where: { email: normalized },
  });
  if (existing) {
    return existing;
  }
  return prisma.user.create({
    data: {
      email: normalized,
      emailVerified: new Date(),
    },
  });
}

type OAuthProfile = {
  email?: string | null;
  name?: string | null;
  picture?: string | null;
  image?: string | null;
  email_verified?: boolean;
};

/** Keeps OAuth profile fields in sync when the same email already has an account. */
export async function syncUserProfileFromOAuth(
  userId: string,
  profile: OAuthProfile,
): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return;
  }

  const image = profile.picture ?? profile.image;

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: user.name ?? profile.name ?? undefined,
      image: user.image ?? image ?? undefined,
      emailVerified:
        user.emailVerified ??
        (profile.email_verified ? new Date() : undefined),
    },
  });
}
