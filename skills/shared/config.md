# Description
- Centralize all environment variable access here. Do not read `process.env` directly outside of this file.
- Use the non-null assertion `!` only when the variable is guaranteed to exist in all environments. For optional vars, type them as `string | undefined`.
- `NEXT_PUBLIC_` prefix is required for variables accessed on the client side.
- Export a single `config` object. Do not export individual variables.

# Template
```ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
} as const;
```
