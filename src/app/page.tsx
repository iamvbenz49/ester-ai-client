import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HomeView from "@/features/home/components/HomeView";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return <HomeView user={session.user} />;
}
