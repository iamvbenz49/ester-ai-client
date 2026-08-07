import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/email";
import { findOrCreateUserForMagicLink } from "@/server/auth/link-account";

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

export function hashMagicToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createMagicLinkForEmail(email: string): Promise<{
  url: string;
  token: string;
}> {
  const normalized = normalizeEmail(email);
  await findOrCreateUserForMagicLink(normalized);

  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashMagicToken(token);
  const expiresAt = new Date(Date.now() + MAGIC_LINK_TTL_MS);

  await prisma.magicLinkToken.create({
    data: {
      email: normalized,
      tokenHash,
      expiresAt,
    },
  });

  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/api/auth/magic-link/verify?token=${encodeURIComponent(token)}`;

  return { url, token };
}

export async function consumeMagicLinkToken(token: string): Promise<{
  userId: string;
  email: string;
} | null> {
  const tokenHash = hashMagicToken(token);
  const now = new Date();

  const record = await prisma.magicLinkToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: now },
    },
  });

  if (!record) {
    return null;
  }

  await prisma.magicLinkToken.update({
    where: { id: record.id },
    data: { usedAt: now },
  });

  const user = await findOrCreateUserForMagicLink(record.email);

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: user.emailVerified ?? new Date() },
  });

  return { userId: user.id, email: record.email };
}
