import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthFormShell({ children, footer }: Props) {
  return (
    <section className="flex min-h-full w-full items-center justify-center bg-[#09090F] px-6 py-5 sm:px-12">
      <div className="w-full max-w-[440px]">
        {children}
        {footer}
      </div>
    </section>
  );
}
