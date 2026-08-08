# Go chat service contract (MVP)

The browser never calls the Go service directly. All chat traffic goes through Next.js API routes. The Go service is server-to-server only.

## Environment (Next.js — server only)

Add to `.env` (never use `NEXT_PUBLIC_*` for these):

| Variable | Description |
|----------|-------------|
| `GO_SERVICE_URL` | Base URL of the Go service, e.g. `http://localhost:8080` |
| `GO_SERVICE_SECRET` | Shared secret; Next sends `Authorization: Bearer <secret>` |

See [.env.example](../.env.example).

## Planned user message flow

```text
Browser
  → POST /api/conversations/[id]/messages  (Next.js, session cookie)
      → validate session + conversation ownership
      → save user Message in Postgres
      → POST {GO_SERVICE_URL}/v1/chat
      → return assistant reply to browser
```

`POST /api/conversations/[id]/messages` is not implemented in this repo yet; the placeholder chat UI documents the next step.

## `POST /v1/chat` (Go service)

**Caller:** Next.js server only.

**Headers:**

- `Authorization: Bearer {GO_SERVICE_SECRET}`
- `Content-Type: application/json`

**Request body:**

```json
{
  "conversationId": "string",
  "userId": "string",
  "characterId": "string",
  "messageId": "string"
}
```

The user message must already exist in Postgres (`Message` with `role: "user"`). Go loads content by `messageId`.

**Go processing:**

1. Load `Character` (system prompt)
2. Load last 10 `Message` rows for the conversation
3. Retrieve top-K relevant memories from the vector DB for `(userId, characterId)`
4. Build prompt: character + recent messages + memories + current user message
5. Call LLM
6. Save assistant `Message` in Postgres
7. Async: memory extraction → embed → vector DB

**Response (non-streaming MVP):**

```json
{
  "messageId": "string",
  "content": "string"
}
```

**Streaming (optional):** Go may stream tokens; Next proxies SSE to the browser and still persists the final assistant message in Go.

**Errors:**

| Status | Meaning |
|--------|---------|
| 401 | Invalid or missing service secret |
| 404 | Conversation, character, or message not found |
| 500 | LLM or internal failure |

## Data ownership

| Store | Owned by | Contents |
|-------|----------|----------|
| Postgres | Next + Go (shared) | Users, Characters, Conversations, Messages |
| Vector DB | Go only | Memories (embeddings) |

Characters are platform-seeded in Postgres via `npm run db:seed` (`prisma/seed.mjs`).
