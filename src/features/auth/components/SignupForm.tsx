"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Mail, User } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
  authSubtitleClass,
  authTitleClass,
  emailFieldClass,
  primaryButtonClass,
} from "@/features/auth/auth-constants";
import AuthBrandHeader from "@/features/auth/components/AuthBrandHeader";
import AuthFormShell from "@/features/auth/components/AuthFormShell";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import TermsFooter from "@/features/auth/components/TermsFooter";

const signupFormSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setBannerError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.name?.trim() || undefined,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setBannerError(
          payload.error ??
            AUTH_ERROR_MESSAGES.Default,
        );
        return;
      }

      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResult?.error) {
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

  const fieldError = useMemo(
    () => errors.email?.message ?? errors.password?.message ?? errors.name?.message,
    [errors],
  );

  return (
    <AuthFormShell footer={<TermsFooter />}>
      <AuthBrandHeader />

      <h1 className={authTitleClass}>Create account</h1>

      <p className={authSubtitleClass}>
        Start your journey with your companion.
      </p>

      {bannerError ? (
        <div
          className={`${authBlockGap} ${authBannerBoxClass} border-rose-500/40 bg-rose-500/10 ${authBannerClass}`}
          role="alert"
        >
          {bannerError}
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

      <form onSubmit={onSubmit} className={authFormStack} noValidate>
        <div className={emailFieldClass}>
          <User size={authFieldIconSize} className="shrink-0 text-zinc-500" />
          <input
            type="text"
            autoComplete="name"
            placeholder="Name (optional)"
            className={authInputWithIconClass}
            {...register("name")}
          />
        </div>

        <div className={emailFieldClass}>
          <Mail size={authFieldIconSize} className="shrink-0 text-zinc-500" />
          <input
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            className={authInputWithIconClass}
            {...register("email")}
          />
        </div>

        <div className={emailFieldClass}>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            className={`px-1 ${authInputClass}`}
            {...register("password")}
          />
        </div>

        {fieldError ? (
          <p className="text-sm text-rose-400" role="alert">
            {fieldError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className={primaryButtonClass}
        >
          {isSubmitting ? (
            <>
              Creating account…
              <Loader2 size={authFieldIconSize} className="animate-spin" aria-hidden />
            </>
          ) : (
            <>
              Create account
              <ArrowRight size={authFieldIconSize} />
            </>
          )}
        </button>
      </form>

      <p className={authFooterLinkClass}>
        Already have an account?{" "}
        <Link href="/login" className="text-violet-400 hover:text-violet-300">
          Log in
        </Link>
      </p>
    </AuthFormShell>
  );
}
