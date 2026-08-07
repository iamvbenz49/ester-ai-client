import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { auth } from "@/auth";
import AuthSessionProvider from "@/components/AuthSessionProvider";

export const metadata: Metadata = {
  title: "Ester AI",
  description: "Your AI companion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
