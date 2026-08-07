import { authFooterLinkClass } from "@/features/auth/auth-constants";

export default function TermsFooter() {
  return (
    <p className={`${authFooterLinkClass} mt-4 leading-relaxed`}>
      By continuing you agree to our{" "}
      <button type="button" className="text-violet-400 hover:text-violet-300">
        Terms
      </button>{" "}
      &{" "}
      <button type="button" className="text-violet-400 hover:text-violet-300">
        Privacy Policy
      </button>
      .
    </p>
  );
}
