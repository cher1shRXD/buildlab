# Description
- Pure utility functions and thin wrappers around external libraries go here.
- No business logic, no API calls, no store access, no side effects.
- If a utility function is only used inside one feature, put it in `features/{feature}/utils/` instead.
- Each file should group related utilities (e.g. `date.ts`, `string.ts`, `cn.ts`).
- Fully type all inputs and outputs. Do not use `any`.

# Template
```ts
export const formatDate = (date: Date, locale = 'ko-KR'): string =>
  new Intl.DateTimeFormat(locale).format(date);
```
