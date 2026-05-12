# Description
- Define the base HTTP client instance here. All `{Entity}Api` objects import from this file.
- Do not add endpoint-specific logic here. This file only sets up base configuration: base URL, default headers, auth header injection, and error normalization.
- Export a single `apiClient` object with typed methods. Do not export the raw fetch or axios instance.
- All methods must return a typed Promise. Use generics for the response type.
- Normalize error responses into `ErrorResponse` (from `shared/types`) so callers always receive the same error shape.

# Template
```ts
import type { ErrorResponse } from '@/shared/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();
    throw error;
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
```
