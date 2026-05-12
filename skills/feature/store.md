# Description
- Name as `use{Entity}Store` in camelCase.
- Define the store interface above `create`. State fields and actions must all be declared in the interface.
- Use Zustand's `create` from `zustand`. Do not use `zustand/middleware` unless persistence is explicitly required.
- Store only UI state that must be shared across components (e.g. selected item, modal open state, filter values). Server data belongs in React Query, not in a store.
- Always include a `reset` action to restore initial state.
- Do not call `{Entity}Api` or any async function inside a store action. Side effects belong in hooks or Server Actions.
- Store can have only this 3 functions - state, setter function, reset function.

# Template
```ts
interface State {
  field: type;
  setField: (value: type) => void;
  reset: () => void;
}

const useEntityStore = create<State>((set) => ({
  field: initialValue,
  setField: (value) => set({ field: value }),
  reset: () => set({ field: initialValue }),
}));
```
