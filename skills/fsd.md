# FSD directory structure

## file and directory naming rule
1. component - pascal case
2. hook - camel case, 'use' prefix
3. store - kebab case, only use object name. ex) store for loading state -> loading.ts
4. others - kebab case.

## directory name list
1. app
2. entities
3. features
4. shared
5. widgets

## app
This directory is for routes.
Follow the Next.js docs for modify routes.

## entities
This directory is for entities in business logics.
Each entity has types.ts, apis.ts, mutations.ts, queries.ts, ui/ files and directory.
1. types.ts - Entity types and DTOs (required) code convention: @entity-type.md
2. apis.ts - API interfaces for HTTP Request or DB queries (required) code convention: @entity/api.md
3. mutations.ts - A collection of tanstack/react-query mutation hooks. (optional) code convention: @entity/mutation.md
4. queries.ts - A collection of tanstack/react-query query hooks. (optional) code convention: @entity/query.md
5. ui/ - A directory for data-display component. It has ONLY ui code, NOT user events. (optional) code convention: @entity/ui.md

## features
This directory is for user actions.
Each feature has actions/, hooks/, stores/, constants/, ui/, utils/ directory.
All of directories are optional. selective usages of directory are required.
1. actions/ - A directory for Next.js Server Action functions. code convention: @feature/action.md
2. hooks/ - A directory for business logics in React Components. code convention: @feature/hook.md
3. stores/ - A directory for Zustand stores. code convention: @feature/store.md
4. constants/ - A directory for constant variables. code convention: @feature/constant.md
5. ui/ - A directory for React Components. code convention: @feature/ui.md
6. utils/ - A directory for pure functions. code convention: @feature/utils.md

## shared

This directory is for reusable code that has no business logic and no dependency on any other FSD layer.
Each segment is a flat directory inside shared/.
1. ui/ - Generic UI components (Button, Input, Modal, Badge, etc.) that are unaware of any entity or feature. Must work through props only. (optional)
2. api/ - Base HTTP client instance and shared request configuration (e.g. auth header injection). Endpoint-specific functions go in entities, not here. (optional)
3. config/ - App-wide constants and environment variable accessors. (optional)
4. lib/ - Pure utility functions and wrappers around external libraries (e.g. date formatting, cn helper). No side effects. (optional)
5. types/ - Shared TypeScript types used across layers (e.g. Id, Nullable, Pagination). (optional)

## widgets

This directory is for independent UI blocks that compose entities and features together.
Each widget is a directory named after the block it represents and has a ui/ directory inside.
1. ui/ - Compositional React components. Layout and composition only — no data transformation or side-effect logic. (required)

Widgets may import from shared, entities, and features. Importing from app or from another widget is not allowed.
If a widget needs state or server communication, use hooks and stores from features. Do not create new business logic inside a widget.