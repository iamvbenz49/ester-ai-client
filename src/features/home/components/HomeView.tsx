"use client";

import { signOut } from "next-auth/react";
import type { User } from "next-auth";

type Props = {
  user: User;
};

function getInitial(user: User) {
  const source = user.name?.trim() || user.email?.trim() || "?";
  return source.charAt(0).toUpperCase();
}

export default function HomeView({ user }: Props) {
  const displayName = user.name || user.email || "there";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050616] px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18)_0%,transparent_65%)]"
        aria-hidden
      />

      <div className="home-enter relative w-full max-w-[520px]">
        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/60">
            <span className="text-xl font-light text-violet-400">E</span>
          </div>
          <span className="text-lg font-light tracking-[10px] text-white">
            ESTER
          </span>
        </div>

        <h1 className="text-center text-5xl font-semibold tracking-[-2px] text-white sm:text-6xl">
          Welcome back
        </h1>

        <p className="mt-6 text-center text-lg leading-8 text-zinc-400 sm:text-xl">
          Signed in as{" "}
          <span className="text-zinc-200">{displayName}</span>
        </p>

        <div className="mt-12 flex justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border-2 border-violet-500/60 object-cover shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-violet-500/60 bg-violet-500/10 text-3xl font-medium text-violet-300 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
              {getInitial(user)}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group mt-14 flex h-16 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#9333EA] text-xl font-semibold text-white shadow-[0_15px_40px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(124,58,237,0.45)]"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
