import { auth } from "@/auth";
import { redirect } from "next/navigation";
import HomeView from "@/features/home/components/HomeView";
import { listActiveCharacters } from "@/server/characters/list-active-characters";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const characters = await listActiveCharacters();

  return <HomeView user={session.user} characters={characters} />;
}
