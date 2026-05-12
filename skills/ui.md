# Description
- One file can have only one component except skeleton ui.

**Client Component**
- Add `'use client'` at the top.
- Define a `Props` interface above the component. Do not inline prop types in the function signature.
- Compose state and logic from hooks. Do not write business logic or API calls inline.
- Use `export default` at the bottom.

**Server Component**
- Declare as an `async` function. Do not add `'use client'`.
- Fetch data by calling entity API functions. Use `Promise.all` for parallel fetches.
- Do not use React state hooks (`useState`, `useEffect`). Server Components cannot use them.
- Use `export default` at the bottom.

**Server Page**
- Follow Next.js page props — `params` and `searchParams` are Promises and must be `await`ed.
- Define `PageUrlProps` in `shared/types`. Do not inline the type in the page file.
- Use `export default function` (named function declaration), not an arrow function.

**Design System Component**
- Extend `ComponentProps<"htmlelement">` for the root HTML element.
- Spread `...props` onto the root element so all native HTML attributes pass through.
- Keep atomic — no business logic, no data fetching, no entity knowledge.
- Use named export, not `export default`.

# Template - Client Component
```tsx
"use client";

interface Props {
  prop1: type,
  prop2: type
}

const ReactClientComponent = ({ prop1, prop2 }: Props) => {
  const { field1, field2 } = useSomeHook();

  return (
    // jsx
  )
}

export default ReactClientComponent;
```

# Template - Server Component
```tsx
const ReactServerComponent = async () => {
  const [data1, data2] = await Promise.all([/* API Functions in Entity */]);

  return (
    // jsx
  )
}

export default ReactServerComponent
```

# Template - Server Page
```tsx
export default function ServerPage({ params, searchParams }: PageUrlProps) { // Follow the Next.js page props. params and search params. Define PageUrlProps in shared/types
  const [data1, data2] = await Promise.all([/* API Functions in Entity */]);

  return (
    // jsx
  )
}
```

# Template - Design System Component
```tsx
interface Props extends ComponentProps<"htmlelement"> {
  prop1: type,
  prop2: type
}

export const AtomicComponent = async ({ prop1, prop2, ...props }: Props) => {
  return (
    // jsx
  )
}
```

# Template - Skeleton ui

```tsx

const ReactServerComponent = async () => {
  const [data1, data2] = await Promise.all([/* API Functions in Entity */]);

  return (
    // jsx
  )
}

ReactServerComponent.Skeleton = () => (
  // jsx
)

export default ReactServerComponent

```