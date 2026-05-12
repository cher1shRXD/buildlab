# Description
- Define shared TypeScript types that are used across multiple layers here.
- Do not define entity-specific types here — those belong in `entities/{entity}/types.ts`.
- Each type should have a single, clear purpose. Do not bundle unrelated types in one file.

Common types to define in this directory:
- `Id` — the application-wide identifier type (e.g. `type Id = string`)
- `Nullable<T>` — `T | null`
- `PageUrlProps` — Next.js page props shape (`params` and `searchParams` as Promises). Import this in every `page.tsx`.
- `ErrorResponse` — the shape of error payloads returned by the API. Import this in `mutation.ts` files.
- `Pagination<T>` — wrapper for paginated list responses.

# Template
```ts
export type Id = string;

export type Nullable<T> = T | null;

export type PageUrlProps<
  TParams extends Record<string, string> = Record<string, string>,
  TSearch extends Record<string, string> = Record<string, string>
> = {
  params: Promise<TParams>;
  searchParams: Promise<TSearch>;
};

export type ErrorResponse = {
  message: string;
  code?: string;
};

export type Pagination<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
```
