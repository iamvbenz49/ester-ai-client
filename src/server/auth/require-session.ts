import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function requireSessionUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      userId: null,
      unauthorized: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { userId, unauthorized: null };
}
