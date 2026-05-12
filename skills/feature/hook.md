# Description
- Name as `use{Entity}{Action}` in camelCase.
- A hook connects UI events to mutations or server actions. It must not contain fetch logic or direct API calls.
- Compose mutation hooks from `entities/{entity}/mutations.ts`. Do not call `{Entity}Api` directly inside a hook.
- Expose only what the component needs — handlers and derived state (e.g. `isPending`, `isError`). Do not expose the raw mutation object.
- Do not put JSX or component logic inside a hook.

# Template
```ts
const useEntityAction = (field1: type, field2: type) => { // fields are optional
  const mutation = useCreateEntityMutation();

  const handleAction = (payload: { field: type }) => {
    mutation.mutate(payload);
  };

  return { handleAction, isPending: mutation.isPending };
};
```
