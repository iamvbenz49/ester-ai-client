import type { ReactNode } from "react";
import Hero from "@/features/auth/components/Hero";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex h-screen bg-[#050616]">
      <Hero />
      <section className="flex flex-1 items-center justify-center">
        {children}
      </section>
    </main>
  );
}