import Link from "next/link";
import type { CharacterPublic } from "@/server/characters/character-public";

type Props = {
  character: CharacterPublic;
};

export default function ChatPlaceholderView({ character }: Props) {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#050616] px-6 py-10">
      <div className="mx-auto w-full max-w-[640px]">
        <Link
          href="/"
          className="text-sm text-zinc-400 transition-colors hover:text-white"
        >
          ← Back
        </Link>

        <header className="mt-8 flex items-center gap-4">
          {character.avatarUrl ? (
            <img
              src={character.avatarUrl}
              alt=""
              className="h-12 w-12 rounded-full border border-violet-500/40 object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-lg font-medium text-violet-300">
              {character.name.charAt(0)}
            </div>
          )}
          <h1 className="text-2xl font-semibold text-white">{character.name}</h1>
        </header>

        {character.greeting ? (
          <div className="mt-10 rounded-2xl border border-violet-500/20 bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-violet-300/90">
              {character.name}
            </p>
            <p className="mt-2 text-base leading-7 text-zinc-200">
              {character.greeting}
            </p>
          </div>
        ) : null}

        <p className="mt-10 text-center text-sm text-zinc-500">
          Messaging connects through the Next.js API and Go service in the next
          step.
        </p>
      </div>
    </main>
  );
}
