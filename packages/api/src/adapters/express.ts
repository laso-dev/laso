import type { Request, Response, Router } from 'express'
import type { LasoConfig, GenericRequest } from '../core/types.js'
import { createRoutes } from '../core/routes.js'

export function createExpressAdapter(config: LasoConfig) {
  return (router: Router) => {
    const routes = createRoutes(config)

    for (const route of routes) {
      const method = route.method.toLowerCase() as Lowercase<typeof route.method>
      const path = route.path

      router[method](path, async (req: Request, res: Response) => {
        try {
          const genericReq: GenericRequest = {
            method: req.method,
            url: req.url,
            headers: req.headers as Record<string, string>,
            query: req.query as Record<string, string>,
            body: req.body,
          }

          const response = await route.handler(genericReq)

          if (response.headers) {
            Object.entries(response.headers).forEach(([key, value]) => {
              res.setHeader(key, value)
            })
          }

          res.status(response.status)

          if (typeof response.body === 'string') {
            res.send(response.body)
          } else {
            res.json(response.body)
          }
        } catch (error) {
          console.error('Route handler error:', error)
          res.status(500).json({ error: 'Internal server error' })
        }
      })
    }

    return router
  }
}

