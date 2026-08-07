import type { NextAuthConfig } from "next-auth";

const authPublicPaths = ["/login", "/signup"];

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      if (
        pathname.startsWith("/api/auth") &&
        !pathname.startsWith("/api/auth/signup") &&
        !pathname.startsWith("/api/auth/magic-link")
      ) {
        return true;
      }

      if (
        pathname.startsWith("/api/auth/signup") ||
        pathname.startsWith("/api/auth/magic-link")
      ) {
        return true;
      }

      if (authPublicPaths.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (isLoggedIn) {
        return true;
      }

      return Response.redirect(new URL("/login", nextUrl));
    },
  },
} satisfies NextAuthConfig;
