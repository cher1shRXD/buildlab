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
| @supabase/supabase-js | ^2 | |
| @supabase/ssr | ^0.10 | server/client helper |
| @tanstack/react-query | ^5 | |
| zustand | ^5 | |

## Architecture

FSD (Feature-Sliced Design) — see `.claude/CLAUDE.md` for full conventions.

```
src/
  app/          routes (Next.js)
  entities/     flow/, skill/
  features/     auth/, canvas-editor/, editor-layout/, flow-validation/, node-editor/, skill-export/, skill-library/
  shared/       api/, config/, lib/, types/, ui/
  widgets/      auth-shell/, dashboard-sidebar/, ...
  db/           Supabase client factory and schema types
```

## Database

- Engine: PostgreSQL via Supabase
- Client: `@supabase/supabase-js` + `@supabase/ssr`
- Client factory: `src/db/index.ts` — exports `createSupabaseServerClient()`
- Raw types + mappers: `src/db/schema.ts` — exports `Skill`, `Flow`, `toSkillMeta()`, `toFlowData()`
- RLS enabled on all tables — queries are automatically scoped to the authenticated user
- Schema changes: apply SQL directly in the Supabase dashboard SQL Editor

### Tables (snake_case columns)

| Table | Key columns |
|---|---|
| `skills` | id, user_id, name, description, version, user_invocable, tags, compatible_platforms, is_published |
| `flows` | id, skill_id (unique), version, nodes_json, edges_json, viewport_json |
| `skill_exports` | id, skill_id, flow_version, skill_md_content |

Create the server client and query:

```ts
import { createSupabaseServerClient, toSkillMeta } from '@/db';

const supabase = await createSupabaseServerClient();
const { data } = await supabase.from('skills').select('*').eq('user_id', user.id);
```

Always use `toSkillMeta(row)` / `toFlowData(row)` when mapping Supabase rows to entity types.

## Auth

- Provider: Supabase Auth + GitHub OAuth
- Config: `src/shared/lib/auth.ts` (server), `src/shared/lib/auth-client.ts` (client)
- OAuth callback: `src/app/auth/callback/route.ts`
- Session is refreshed automatically via `middleware.ts`

**Server-side** (Server Components, Route Handlers):
```ts
import { auth } from '@/shared/lib/auth';
const session = await auth(); // returns { user: { id, email, name, image } } | null
```

**Client-side** (Client Components):
```ts
import { signIn, signOut } from '@/shared/lib/auth-client';
await signIn();   // redirects to GitHub OAuth
await signOut();  // signs out and redirects to /login
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
- `GET/PUT/DELETE /api/skills/[skillId]`
- `POST /api/skills/[skillId]/export`
- `GET/PUT /api/flows/[flowId]`

## Environment Variables

| Variable | Required | Side |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | yes | both |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | yes | both |
| `NEXT_PUBLIC_APP_URL` | yes | both |

Access via `@/shared/config`: `import { config } from '@/shared/config'`

## Rule Enforcement

`pnpm rules:check` validates FSD layer imports, React Compiler compliance, Tailwind v4 syntax, and file size limits. Runs automatically on build, lint, and pre-commit. Run it after making changes.
