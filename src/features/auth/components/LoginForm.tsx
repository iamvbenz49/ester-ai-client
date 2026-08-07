"use client";

import { ArrowRight, Loader2, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: "Access was denied. Try again or use another account.",
  Configuration:
    "Sign-in is not configured correctly. Check your Google OAuth settings.",
  OAuthAccountNotLinked:
    "This email is already linked to another sign-in method.",
  OAuthSignin: "Could not start Google sign-in. Please try again.",
  OAuthCallback: "Google sign-in failed. Please try again.",
  Default: "Something went wrong. Try again.",
};

const socialButtonClass =
  "group flex h-16 w-full items-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 transition-all duration-300 hover:border-violet-500/40 hover:bg-white/[0.04]";

const stubButtonClass =
  "group flex h-16 w-full cursor-not-allowed items-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 opacity-50";

export default function LoginCard() {
  const searchParams = useSearchParams();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const authErrorMessage = useMemo(() => {
    const code = searchParams.get("error");
    if (!code) return null;
    return AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.Default;
  }, [searchParams]);

  const handleGoogleSignIn = useCallback(() => {
    setIsGoogleLoading(true);
    void signIn("google", { callbackUrl: "/" });
  }, []);

  return (
    <section className="flex h-full w-full items-center justify-center bg-[#09090F] px-6 sm:px-16">
      <div className="w-full max-w-[480px]">
        <div className="mb-16 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/60">
            <span className="text-xl font-light text-violet-400">E</span>
          </div>

          <span className="text-lg font-light tracking-[10px] text-white">
            ESTER
          </span>
        </div>

        <h1 className="text-[68px] font-semibold leading-none tracking-[-3px] text-white">
          Welcome
        </h1>

        <p className="mt-6 text-[22px] leading-9 text-zinc-400">
          Continue with your account
          <br />
          to meet your companion.
        </p>

        {authErrorMessage ? (
          <div
            className="mt-8 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-5 py-4 text-base leading-relaxed text-zinc-200"
            role="alert"
          >
            {authErrorMessage}
          </div>
        ) : null}

        <div className="mt-14 space-y-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            aria-busy={isGoogleLoading}
            className={`${socialButtonClass} ${
              isGoogleLoading ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <FcGoogle size={30} />

            <span className="ml-6 flex-1 text-left text-xl font-medium text-white">
              {isGoogleLoading ? "Connecting…" : "Continue with Google"}
            </span>

            {isGoogleLoading ? (
              <Loader2
                size={22}
                className="animate-spin text-violet-400"
                aria-hidden
              />
            ) : (
              <ArrowRight
                size={22}
                className="text-zinc-500 transition group-hover:translate-x-1"
              />
            )}
          </button>

          <button
            type="button"
            disabled
            title="Coming soon"
            className={stubButtonClass}
          >
            <FaApple size={28} className="text-white" />

            <span className="ml-6 flex-1 text-left text-xl font-medium text-white">
              Continue with Apple
            </span>

            <ArrowRight size={22} className="text-zinc-500" />
          </button>
        </div>

        <div className="my-12 flex items-center">
          <div className="h-px flex-1 bg-white/10" />
          <span className="mx-6 text-lg text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex h-16 items-center rounded-2xl border border-violet-500/50 bg-transparent px-5 opacity-50">
          <Mail size={22} className="text-zinc-500" />

          <input
            type="email"
            placeholder="Email Address"
            disabled
            title="Coming soon"
            className="ml-4 flex-1 bg-transparent text-lg text-white placeholder:text-zinc-500 outline-none"
          />
        </div>

        <button
          type="button"
          disabled
          title="Coming soon"
          className="group mt-6 flex h-16 w-full cursor-not-allowed items-center justify-center rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#9333EA] text-xl font-semibold text-white opacity-50 shadow-[0_15px_40px_rgba(124,58,237,0.35)]"
        >
          Continue
          <ArrowRight size={22} className="ml-3" />
        </button>

        <p className="mt-12 text-center text-[16px] leading-7 text-zinc-500">
          By continuing you agree to our
          <br />
          <button type="button" className="text-violet-400 hover:text-violet-300">
            Terms
          </button>
          {" & "}
          <button type="button" className="text-violet-400 hover:text-violet-300">
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </section>
  );
}
