# unpic-img Development Guide

## Build and Test Commands

- Build all packages: `pnpm run build:packages`
- Run all tests: `pnpm run test`
- Run a single package test: `pnpm run --filter @unpic/[package] test`
- Run a specific test:
  `pnpm run --filter @unpic/[package] vitest run -t "[test name]"`
- Format code: `pnpm format`
- Check package for publishing: `pnpm run --filter @unpic/[package] publint`

## Code Style Guidelines

- Use TypeScript with strict null checks
- Use JSDoc comments for public functions and types
- Prefer explicit return types for functions
- Use named exports over default exports
- Imports: group and order by external → workspace → local
- Prefer functional programming patterns
- Use camelCase for variables/functions, PascalCase for types/components
- Follow existing error handling patterns (optional logging instead of throwing)
- Format with Prettier (configured in .prettierrc)
- Unit tests written using Vitest
