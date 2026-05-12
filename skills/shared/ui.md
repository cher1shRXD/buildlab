@ui.md

# Additional Rules
- Components here must be Design System Components only. Use the Design System Component template from ui.md.
- No business logic, no entity knowledge, no feature-specific behavior.
- Always extend `ComponentProps<"htmlelement">` and spread `...props` to the root element.
- Use named exports, not `export default`.
