# Laso Monorepo

Monorepo for `@lasodev/api` and `@lasodev/ui` packages.

## Packages

- **@lasodev/api** - Framework adapters (Express, Fastify, Hono) for serving the UI and API endpoints
- **@lasodev/ui** - Full React application built with Vite

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
pnpm --filter @lasodev/api build
pnpm --filter @lasodev/ui build
```

## Examples

See working examples in the `examples/` directory:

- `examples/express/` - Express.js integration
- `examples/fastify/` - Fastify integration  
- `examples/hono/` - Hono integration

Run any example:
```bash
cd examples/express  # or fastify/hono
pnpm install
pnpm start
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

### UI Package

The `@lasodev/ui` package is a full React app that outputs:
- `dist/main.mjs` - ESM bundle with React included
- `dist/styles.css` - All styles bundled

Usage:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Laso App</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.__INITIAL_STATE__ = {
        apiUrl: "https://api.example.com/trpc",
        basename: "/app",
      };
    </script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@lasodev/ui@latest/dist/styles.css"
    />
    <script
      type="module"
      src="https://unpkg.com/@lasodev/ui@latest/dist/main.mjs"
    ></script>
  </body>
</html>
```

The app reads configuration from `window.__INITIAL_STATE__` and renders itself into `#root`.

### API Package

The `@lasodev/api` package provides framework-agnostic adapters:

**Express:**
```javascript
import express from 'express'
import { createExpressAdapter } from '@lasodev/api'

const app = express()
const router = express.Router()

createExpressAdapter({ 
  basePath: '/app',
  uiVersion: 'latest' 
})(router)

app.use('/app', router)
```

**Fastify:**
```javascript
import Fastify from 'fastify'
import { createFastifyAdapter } from '@lasodev/api'

const fastify = Fastify()

await fastify.register(async (instance) => {
  createFastifyAdapter({ 
    basePath: '/app',
    uiVersion: 'latest' 
  })(instance)
}, { prefix: '/app' })
```

**Hono:**
```javascript
import { Hono } from 'hono'
import { createHonoAdapter } from '@lasodev/api'

const app = new Hono()
const lasoApp = new Hono()

createHonoAdapter({ 
  basePath: '/app',
  uiVersion: 'latest' 
})(lasoApp)

app.route('/app', lasoApp)
```

Each adapter automatically sets up:
- UI serving at the base path
- Health check endpoint
- Example API endpoints
- Proper content-type headers
