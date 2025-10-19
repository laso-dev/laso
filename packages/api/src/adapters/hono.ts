import type { Hono, Context } from 'hono'
import type { LasoConfig, GenericRequest } from '../core/types.js'
import { createRoutes } from '../core/routes.js'

export function createHonoAdapter(config: LasoConfig) {
  return (app: Hono) => {
    const routes = createRoutes(config)

    for (const route of routes) {
      const method = route.method.toLowerCase() as Lowercase<typeof route.method>
      const path = route.path

      app[method](path, async (c: Context) => {
        try {
          const genericReq: GenericRequest = {
            method: c.req.method,
            url: c.req.url,
            headers: Object.fromEntries(c.req.raw.headers.entries()),
            query: Object.fromEntries(new URL(c.req.url).searchParams.entries()),
            body: c.req.method !== 'GET' ? await c.req.json().catch(() => undefined) : undefined,
          }

          const response = await route.handler(genericReq)

          if (response.headers) {
            Object.entries(response.headers).forEach(([key, value]) => {
              c.header(key, value)
            })
          }

          c.status(response.status as any)

          if (typeof response.body === 'string') {
            return c.body(response.body)
          } else {
            return c.json(response.body)
          }
        } catch (error) {
          console.error('Route handler error:', error)
          return c.json({ error: 'Internal server error' }, 500)
        }
      })
    }

    return app
  }
}

