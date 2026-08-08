import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import ChatPlaceholderView from "@/features/chat/components/ChatPlaceholderView";
import { getConversationForUser } from "@/server/conversations/get-conversation-for-user";

type PageProps = {
  params: Promise<{ conversationId: string }>;
};

export default async function ChatPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { conversationId } = await params;
  const conversation = await getConversationForUser(
    conversationId,
    session.user.id,
  );

  if (!conversation) {
    notFound();
  }

  return <ChatPlaceholderView character={conversation.character} />;
}
