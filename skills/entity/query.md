# Description
- Always use `useSuspenseQuery`. Do not use `useQuery`.
- Name as `useGet{Entity}{Scope}Query` — `Scope` is `List`, `Detail`, or a specific field name (e.g. `BySlug`).
- `queryFn` must point to a method on `{Entity}Api`. Do not write fetch logic inline.
- `queryKey` must be derived from endpoint segments in the same order as the URL path.
- If the query takes a parameter, pass it as a function argument and include it in both `queryKey` and `queryFn`.

# Template
```ts

const useGetEntityListQuery = () => useSuspenseQuery({
  queryKey: ["some", "endpoint"],
  queryFn: EntityApi.getList,
});

const useGetEntityDetailQuery = (field: type) => useSuspenseQuery({
  queryKey: ["some", "endpoint", field],
  queryFn: () => EntityApi.getList(field),
});

```
