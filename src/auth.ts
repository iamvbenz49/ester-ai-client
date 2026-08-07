import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/email";
import { verifyPassword } from "@/lib/password";
import { consumeMagicLinkToken } from "@/server/auth/magic-link";
import { syncUserProfileFromOAuth } from "@/server/auth/link-account";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        magicToken: { label: "Magic link token", type: "text" },
      },
      async authorize(credentials) {
        const magicToken =
          typeof credentials?.magicToken === "string"
            ? credentials.magicToken
            : undefined;

        if (magicToken) {
          const consumed = await consumeMagicLinkToken(magicToken);
          if (!consumed) {
            return null;
          }
          const user = await prisma.user.findUnique({
            where: { id: consumed.userId },
          });
          return user;
        }

        const email =
          typeof credentials?.email === "string"
            ? credentials.email
            : undefined;
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : undefined;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: normalizeEmail(email) },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const valid = await verifyPassword(password, user.passwordHash);
        if (!valid) {
          return null;
        }

        return user;
      },
    }),
    ...authConfig.providers,
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email;
        if (!email) {
          return false;
        }
      }
      return true;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.id && profile) {
        await syncUserProfileFromOAuth(user.id, profile);
      }
    },
  },
});
