@ui.md

# Additional Rules
- Use the Server Component or Client Component template from ui.md depending on whether the widget needs interactivity.
- A widget composes components from `entities/` and `features/`. Do not write data-fetching or business logic directly inside the widget.
- Do not import from other widgets.
- Use `export default`.
