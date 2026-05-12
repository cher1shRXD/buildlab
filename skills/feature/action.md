# Description
- Always add `'use server'` at the top of the file.
- Name as `{verb}{Entity}` in camelCase — verb matches the operation: `create`, `update`, `delete`, `patch`.
- Call `{Entity}Api` methods for data operations. Do not write fetch logic inline.
- After mutation, call `revalidateTag` or `updateTag` to invalidate related cache. Use `updateTag` for read-your-own-writes, `revalidateTag('tag', 'max')` for background refresh.
- Do not return UI state from a Server Action. Return only data or void.
- Error thrown inside a Server Action propagates to the nearest `error.tsx`. Throw explicitly when the operation fails.

# Template
```ts
'use server'

export async function createEntity(payload: { field1: type; field2: type }) {
  await EntityApi.create(payload);
  revalidateTag('entity', 'max');
}
```
