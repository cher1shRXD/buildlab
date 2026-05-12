# Description
- Use `useMutation` from `@tanstack/react-query`.
- Name as `use{Action}{Entity}Mutation` — `Action` matches the `{Entity}Api` method: `Create`, `Update`, `Delete`, `Patch`.
- `mutationFn` must point to a method on `{Entity}Api`. Do not write fetch logic inline.
- Always handle both `onSuccess` and `onError`.
- In `onSuccess`: invalidate or update related queries via `queryClient`, then show a success toast.
- In `onError`: show an error toast using the message from `err`. Type the error as `ErrorResponse` (from shared/types).
- Hooks like `useQueryClient` and `useToast` must be called outside `useMutation` and closed over inside the callbacks.

# Template
```ts

const useCreateEntityMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutateFn: EntityApi.create,
    onSuccess: (res) => {
      // some actions using the hooks
    },
    onError: (err: ErrorResponse) => {
      // some actions using the hooks
    }
  })
}

```
