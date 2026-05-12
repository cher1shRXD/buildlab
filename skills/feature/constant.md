# Description
- Name constant objects in SCREAMING_SNAKE_CASE.
- Always add `as const` to enable literal type inference.
- One constant per concept. Do not group unrelated constants in a single file.
- Do not put constants that are reused across features here — those belong in `shared/config`.

# Template
```ts
export const CONSTANT_VARIABLE = "contents" as const;
```
