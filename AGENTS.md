<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Buildlab

A web-based skill builder where users design agent skills as visual flows (nodes + edges) and export them as `SKILL.md` files conforming to the agentskills.io specification.

## Key Versions

| Package | Version | Notes |
|---|---|---|
| next | 16.2.6 | Breaking changes vs 15 — read `node_modules/next/dist/docs/` |
| react | 19.2.4 | |
| next-auth | 5.0.0-beta.31 | v5 beta — API differs from v4 |
| @tanstack/react-query | ^5 | |
| zustand | ^5 | |
| drizzle-orm | ^0.45 | |

## Architecture

FSD (Feature-Sliced Design) — see `.claude/CLAUDE.md` for full conventions.

```
src/
  app/          routes (Next.js)
  entities/     flow/, skill/
  features/     auth/, canvas-editor/, editor-layout/, flow-validation/, node-editor/, skill-export/, skill-library/
  shared/       api/, config/, lib/, types/, ui/
  widgets/      auth-shell/, dashboard-sidebar/, ...
  db/           Drizzle ORM connection and schema
```

## Database

- Engine: MySQL via `mysql2`
- ORM: Drizzle ORM
- Connection: `src/db/index.ts` — exports `db` and re-exports all schema types
- Schema: `src/db/schema.ts`
- Migrations: `pnpm db:generate` → `pnpm db:migrate`

### Tables

| Table | Key fields |
|---|---|
| `user` | id, name, email, image, createdAt |
| `session` | sessionToken, userId, expires |
| `account` | userId, provider, providerAccountId (compound PK) |
| `skills` | id, userId, name, description, version, isPublished |
| `flows` | id, skillId (unique), nodesJson, edgesJson, viewportJson |
| `skill_exports` | id, skillId, flowVersion, skillMdContent |

Import DB: `import { db } from '@/db'`
Import types: `import type { Skill, Flow } from '@/db'`

## Auth

- Provider: NextAuth v5 + GitHub OAuth + DrizzleAdapter
- Config: `src/shared/lib/auth.ts`

**Server-side** (Server Components, Route Handlers, Server Actions):
```ts
import { auth } from '@/shared/lib/auth';
const session = await auth();
```

**Client-side** (Client Components):
```ts
import { signIn, signOut, useSession } from '@/shared/lib/auth-client';
```

Sign-in page: `/login`

## API Routes

REST handlers in `src/app/api/`. Use `RouteHandlerProps` from `@/shared/types` for params.

```ts
import type { RouteHandlerProps } from '@/shared/types';

export async function GET(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
}
```

Existing routes:
- `GET/POST /api/skills`
- `GET/PATCH/DELETE /api/skills/[skillId]`
- `POST /api/skills/[skillId]/export`
- `GET/PUT /api/flows/[flowId]`
- `GET/POST /api/auth/[...nextauth]`

## Environment Variables

| Variable | Required | Side |
|---|---|---|
| `DATABASE_URL` | yes | server |
| `AUTH_SECRET` | yes | server |
| `AUTH_GITHUB_ID` | yes | server |
| `AUTH_GITHUB_SECRET` | yes | server |
| `NEXT_PUBLIC_APP_URL` | yes | both |

Access via `@/shared/config`: `import { config } from '@/shared/config'`

## Rule Enforcement

`pnpm rules:check` validates FSD layer imports, React Compiler compliance, Tailwind v4 syntax, and file size limits. Runs automatically on build, lint, and pre-commit. Run it after making changes.
