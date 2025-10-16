# Laso Monorepo

Monorepo for `@laso/api` and `@laso/ui` packages.

## Packages

- **@laso/api** - TypeScript library built with tsup
- **@laso/ui** - React component library built with Vite

## Setup

```bash
pnpm install
```

## Development

Build all packages:
```bash
pnpm build
```

Build individual packages:
```bash
pnpm --filter @laso/api build
pnpm --filter @laso/ui build
```

## Publishing

Both packages are always published together with the same version.

### Release Process

1. Bump version in both packages:
```bash
pnpm version:patch  # 0.0.1 -> 0.0.2
pnpm version:minor  # 0.0.1 -> 0.1.0
pnpm version:major  # 0.0.1 -> 1.0.0
```

2. Publish to npm (builds automatically via prepublishOnly hook):
```bash
pnpm release
```

That's it! The `prepublishOnly` hook ensures packages are built before publishing.

## Package Configuration

Both packages are configured for:
- ✅ ESM-only output
- ✅ TypeScript definitions (.d.ts)
- ✅ Source maps
- ✅ Proper package.json exports
- ✅ Public npm access
