@ui.md

# Description
- Add `'use client'` at the top. Feature UI components handle user events and therefore must be Client Components.
- Name as `{Entity}{Action}` — e.g. `PostCreateForm`, `UserDeleteButton`, `CommentEditModal`.
- Compose business logic from hooks in `hooks/`. Do not write mutation or state logic inline inside the component.
- Data-display only components (no user events) belong in `entities/{entity}/ui/`, not here.
- Props should be minimal. Avoid passing raw query data as props — let the hook own the data.

# Template
```tsx
'use client'

const EntityActionForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { handleAction, isPending } = useEntityAction();

  return (
    <form action={handleAction}>
      {/* form fields */}
    </form>
  );
};
```
