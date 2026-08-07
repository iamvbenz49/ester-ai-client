import type { ReactNode } from "react";
import Hero from "@/features/auth/components/Hero";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex h-dvh max-h-dvh overflow-hidden bg-[#050616]">
      <Hero />
      <section className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        {children}
      </section>
    </main>
  );
}