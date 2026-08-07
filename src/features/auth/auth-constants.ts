export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: "Access was denied. Try again or use another account.",
  Configuration:
    "Sign-in is not configured correctly. Check your Google OAuth settings.",
  OAuthAccountNotLinked:
    "This email is already linked to another sign-in method.",
  OAuthSignin: "Could not start Google sign-in. Please try again.",
  OAuthCallback: "Google sign-in failed. Please try again.",
  InvalidLink: "This sign-in link is invalid or has expired.",
  CredentialsSignin: "Invalid email or password.",
  Default: "Something went wrong. Try again.",
};

/** Vertical rhythm for auth forms (single-screen layout, ~25% scale bump) */
export const authBlockGap = "mt-5";
export const authDividerMy = "my-5";
export const authFormStack = "space-y-4";

export const socialButtonClass =
  "group flex h-14 w-full items-center rounded-xl border border-white/10 bg-white/[0.02] px-5 text-[0.9375rem] transition-all duration-300 hover:border-violet-500/40 hover:bg-white/[0.04]";

export const stubButtonClass =
  "group flex h-14 w-full cursor-not-allowed items-center rounded-xl border border-white/10 bg-white/[0.02] px-5 opacity-50";

export const primaryButtonClass =
  "group mt-4 flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#9333EA] text-[0.9375rem] font-semibold text-white shadow-[0_12px_32px_rgba(124,58,237,0.32)] transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60";

export const emailFieldClass =
  "flex h-14 items-center rounded-xl border border-violet-500/50 bg-transparent px-5 focus-within:border-violet-400/70";

export const authTitleClass =
  "text-[1.875rem] font-semibold leading-tight tracking-[-0.5px] text-white sm:text-[2.1875rem]";

export const authSubtitleClass =
  "mt-1.5 text-[0.9375rem] leading-snug text-zinc-400";

export const authInputClass =
  "flex-1 bg-transparent text-[0.9375rem] text-white placeholder:text-zinc-500 outline-none";

export const authInputWithIconClass =
  "ml-3.5 flex-1 bg-transparent text-[0.9375rem] text-white placeholder:text-zinc-500 outline-none";

export const authBannerClass =
  "text-[0.8125rem] leading-relaxed text-zinc-200 sm:text-[0.9375rem]";

export const authBannerBoxClass = "rounded-xl border px-4 py-3";

export const authDividerLabelClass =
  "mx-4 text-[0.8125rem] text-zinc-500 sm:text-[0.9375rem]";

export const authModeTabClass =
  "flex-1 rounded-lg py-2.5 text-[0.8125rem] font-medium transition sm:text-[0.9375rem]";

export const authFooterLinkClass =
  "mt-5 text-center text-[0.8125rem] text-zinc-500 sm:text-[0.9375rem]";

/** Lucide icon size for auth form fields */
export const authFieldIconSize = 22;
