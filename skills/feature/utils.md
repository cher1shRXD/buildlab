# Description
- Name as a verb phrase in camelCase — e.g. `formatDate`, `parseEntity`, `calcDiscount`.
- Must be a pure function: same input always produces same output, no side effects, no API calls, no store access.
- Fully type both input and output. Do not use `any`.
- If a utility is used across more than one feature, move it to `shared/lib`.

# Template
```ts
const formatEntityField = (value: InputType): OutputType => {
  // pure transformation, no side effects
  return result;
};
```