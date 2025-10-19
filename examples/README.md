# Laso Examples

Example implementations showing how to use `@lasodev/api` with different frameworks.

## Express Example

```bash
cd examples/express
pnpm install
pnpm start
```

Visit http://localhost:3000/app

## Fastify Example

```bash
cd examples/fastify
pnpm install
pnpm start
```

Visit http://localhost:3001/app

## Hono Example

```bash
cd examples/hono
pnpm install
pnpm start
```

Visit http://localhost:3002/app

## API Endpoints

All examples expose the same endpoints:

- `GET /app` - Serves the UI application
- `GET /app/health` - Health check endpoint
- `GET /app/api/data` - Returns sample data
- `POST /app/api/data` - Accepts and echoes posted data

## Configuration

Each adapter accepts a `LasoConfig` object:

```typescript
{
  basePath: string      // Base path for all routes (e.g., '/app')
  uiVersion?: string    // UI package version (default: 'latest')
}
```

