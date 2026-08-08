"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CharacterPublic } from "@/server/characters/character-public";

type Props = {
  character: CharacterPublic;
};

export default function StartChatButton({ character }: Props) {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStartChat() {
    setIsStarting(true);
    setError(null);

    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId: character.id }),
      });

      if (!response.ok) {
        setError("Could not start a chat. Please try again.");
        return;
      }

      const data = (await response.json()) as {
        conversation: { id: string };
      };
      router.push(`/chat/${data.conversation.id}`);
    } catch {
      setError("Could not start a chat. Please try again.");
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleStartChat}
        disabled={isStarting}
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#9333EA] text-lg font-semibold text-white shadow-[0_15px_40px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(124,58,237,0.45)] disabled:opacity-60 disabled:hover:scale-100"
      >
        {isStarting ? "Starting…" : "Start chat"}
      </button>
      {error ? (
        <p className="mt-3 text-center text-sm text-red-400">{error}</p>
      ) : null}
    </div>
  );
}
