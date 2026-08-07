"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AUTH_ERROR_MESSAGES,
  authBannerBoxClass,
  authBannerClass,
  authBlockGap,
  authDividerLabelClass,
  authDividerMy,
  authFieldIconSize,
  authFooterLinkClass,
  authFormStack,
  authInputClass,
  authInputWithIconClass,
  authModeTabClass,
  authSubtitleClass,
  authTitleClass,
  emailFieldClass,
  primaryButtonClass,
} from "@/features/auth/auth-constants";
import AuthBrandHeader from "@/features/auth/components/AuthBrandHeader";
import AuthFormShell from "@/features/auth/components/AuthFormShell";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import TermsFooter from "@/features/auth/components/TermsFooter";

const loginFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const magicLinkSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type MagicLinkValues = z.infer<typeof magicLinkSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [bannerSuccess, setBannerSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authErrorMessage = useMemo(() => {
    const code = searchParams.get("error");
    if (!code) return null;
    return AUTH_ERROR_MESSAGES[code] ?? AUTH_ERROR_MESSAGES.Default;
  }, [searchParams]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const magicForm = useForm<MagicLinkValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: "" },
  });

  const switchMode = useCallback((next: "password" | "magic") => {
    setMode(next);
    setBannerError(null);
    setBannerSuccess(null);
  }, []);

  const onPasswordLogin = loginForm.handleSubmit(async (values) => {
    setBannerError(null);
    setBannerSuccess(null);
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setBannerError(AUTH_ERROR_MESSAGES.CredentialsSignin);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setBannerError(AUTH_ERROR_MESSAGES.Default);
    } finally {
      setIsSubmitting(false);
    }
  });

  const onMagicLink = magicForm.handleSubmit(async (values) => {
    setBannerError(null);
    setBannerSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        setBannerError(AUTH_ERROR_MESSAGES.Default);
        return;
      }

      setBannerSuccess(
        "Check your email for a sign-in link. (Dev: link is in the server console.)",
      );
    } catch {
      setBannerError(AUTH_ERROR_MESSAGES.Default);
    } finally {
      setIsSubmitting(false);
    }
  });

  const displayError = bannerError ?? authErrorMessage;
  const passwordErrors = loginForm.formState.errors;
  const magicErrors = magicForm.formState.errors;

  return (
    <AuthFormShell footer={<TermsFooter />}>
      <AuthBrandHeader />

      <h1 className={authTitleClass}>Welcome</h1>

      <p className={authSubtitleClass}>
        Continue with your account to meet your companion.
      </p>

      {displayError ? (
        <div
          className={`${authBlockGap} ${authBannerBoxClass} border-rose-500/40 bg-rose-500/10 ${authBannerClass}`}
          role="alert"
        >
          {displayError}
        </div>
      ) : null}

      {bannerSuccess ? (
        <div
          className={`${authBlockGap} ${authBannerBoxClass} border-emerald-500/40 bg-emerald-500/10 ${authBannerClass}`}
          role="status"
        >
          {bannerSuccess}
        </div>
      ) : null}

      <div className={authBlockGap}>
        <GoogleSignInButton />
      </div>

      <div className={`flex items-center ${authDividerMy}`}>
        <div className="h-px flex-1 bg-white/10" />
        <span className={authDividerLabelClass}>OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mb-4 flex gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-1.5">
        <button
          type="button"
          onClick={() => switchMode("password")}
          className={`${authModeTabClass} ${
            mode === "password"
              ? "bg-violet-600/30 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Email & password
        </button>
        <button
          type="button"
          onClick={() => switchMode("magic")}
          className={`${authModeTabClass} ${
            mode === "magic"
              ? "bg-violet-600/30 text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Magic link
        </button>
      </div>

      {mode === "password" ? (
        <form onSubmit={onPasswordLogin} className={authFormStack} noValidate>
          <div className={emailFieldClass}>
            <Mail size={authFieldIconSize} className="shrink-0 text-zinc-500" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className={authInputWithIconClass}
              {...loginForm.register("email")}
            />
          </div>

          <div className={emailFieldClass}>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className={`px-1 ${authInputClass}`}
              {...loginForm.register("password")}
            />
          </div>

          {passwordErrors.email?.message || passwordErrors.password?.message ? (
            <p className="text-sm text-rose-400" role="alert">
              {passwordErrors.email?.message ??
                passwordErrors.password?.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className={primaryButtonClass}
          >
            {isSubmitting ? (
              <>
                Signing in…
                <Loader2 size={authFieldIconSize} className="animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={authFieldIconSize} />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={onMagicLink} className={authFormStack} noValidate>
          <div className={emailFieldClass}>
            <Mail size={authFieldIconSize} className="shrink-0 text-zinc-500" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className={authInputWithIconClass}
              {...magicForm.register("email")}
            />
          </div>

          {magicErrors.email?.message ? (
            <p className="text-sm text-rose-400" role="alert">
              {magicErrors.email.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className={primaryButtonClass}
          >
            {isSubmitting ? (
              <>
                Sending link…
                <Loader2 size={authFieldIconSize} className="animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Email me a link
                <ArrowRight size={authFieldIconSize} />
              </>
            )}
          </button>
        </form>
      )}

      <p className={authFooterLinkClass}>
        New to Ester?{" "}
        <Link href="/signup" className="text-violet-400 hover:text-violet-300">
          Sign up
        </Link>
      </p>
    </AuthFormShell>
  );
}
