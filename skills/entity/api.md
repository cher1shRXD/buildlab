# Descriptions

- Declare as a `const` object named `{Entity}Api` (PascalCase). Do not use a class.
- Every method must be `async`.
- Use `apiClient` imported from `@/shared/api` for all HTTP calls. Do not use `fetch` directly.
- Pass the response type as a generic on the HTTP method: `apiClient.get<ResponseType>(...)`.
- Type the payload inline as an object literal in the parameter: `payload: { field: type }`. Do not define a separate request type unless it is reused elsewhere.
- Method names follow this convention: `getList`, `getBy{field}`, `create`, `update`, `delete`. Use `patch` only when the request is a partial update.
- No business logic here. This object is a pure HTTP interface — validation, transformation, and error handling belong in `features`.

# Template
```ts

const EntityApi = {
  async getList() {
    return await apiClient.get<ResponseType>("/some-endpoint");
  },

  async create(payload: { field1: type, field2: type }) {
    return await apiClient.post("/some-endpoint")
  }
}

```
