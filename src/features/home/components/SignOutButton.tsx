"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-8 flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-700 text-base font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
    >
      Sign out
    </button>
  );
}
