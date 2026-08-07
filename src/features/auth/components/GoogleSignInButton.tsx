"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { socialButtonClass } from "@/features/auth/auth-constants";

type Props = {
  callbackUrl?: string;
};

export default function GoogleSignInButton({ callbackUrl = "/" }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = useCallback(() => {
    setIsLoading(true);
    void signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      aria-busy={isLoading}
      className={`${socialButtonClass} ${
        isLoading ? "pointer-events-none opacity-70" : ""
      }`}
    >
      <FcGoogle size={28} />

      <span className="ml-3 flex-1 text-left font-medium text-white">
        {isLoading ? "Connecting…" : "Continue with Google"}
      </span>

      {isLoading ? (
        <Loader2 size={22} className="animate-spin text-violet-400" aria-hidden />
      ) : (
        <ArrowRight
          size={22}
          className="text-zinc-500 transition group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}
