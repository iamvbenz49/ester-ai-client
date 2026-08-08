import type { User } from "next-auth";
import type { CharacterPublic } from "@/server/characters/character-public";
import SignOutButton from "./SignOutButton";
import StartChatButton from "./StartChatButton";

type Props = {
  user: User;
  characters: CharacterPublic[];
};

function getInitial(user: User) {
  const source = user.name?.trim() || user.email?.trim() || "?";
  return source.charAt(0).toUpperCase();
}

export default function HomeView({ user, characters }: Props) {
  const displayName = user.name || user.email || "there";
  const primaryCharacter = characters[0];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050616] px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18)_0%,transparent_65%)]"
        aria-hidden
      />

      <div className="home-enter relative w-full max-w-[520px]">
        <div className="mb-16 flex items-center justify-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/60">
            <span className="text-xl font-light text-violet-400">E</span>
          </div>
          <span className="text-lg font-light tracking-[10px] text-white">
            ESTER
          </span>
        </div>

        <h1 className="text-center text-5xl font-semibold tracking-[-2px] text-white sm:text-6xl">
          Welcome back
        </h1>

        <p className="mt-6 text-center text-lg leading-8 text-zinc-400 sm:text-xl">
          Signed in as{" "}
          <span className="text-zinc-200">{displayName}</span>
        </p>

        <div className="mt-12 flex justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border-2 border-violet-500/60 object-cover shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-violet-500/60 bg-violet-500/10 text-3xl font-medium text-violet-300 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
              {getInitial(user)}
            </div>
          )}
        </div>

        {primaryCharacter ? (
          <section
            className="mt-12 rounded-2xl border border-violet-500/25 bg-white/[0.03] p-6"
            aria-label="Companion"
          >
            <div className="flex items-center gap-4">
              {primaryCharacter.avatarUrl ? (
                <img
                  src={primaryCharacter.avatarUrl}
                  alt=""
                  className="h-14 w-14 rounded-full border border-violet-500/40 object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10 text-xl font-medium text-violet-300">
                  {primaryCharacter.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-lg font-medium text-white">
                  {primaryCharacter.name}
                </p>
                {primaryCharacter.greeting ? (
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    {primaryCharacter.greeting}
                  </p>
                ) : null}
              </div>
            </div>
            <StartChatButton character={primaryCharacter} />
          </section>
        ) : (
          <p className="mt-12 text-center text-zinc-500">
            No companions are available yet.
          </p>
        )}

        <SignOutButton />
      </div>
    </main>
  );
}
