import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import type { LasoConfig, GenericRequest } from '../core/types.js'
import { createRoutes } from '../core/routes.js'

export function createFastifyAdapter(config: LasoConfig) {
  return (fastify: FastifyInstance) => {
    const routes = createRoutes(config)

    for (const route of routes) {
      const method = route.method.toLowerCase() as Lowercase<typeof route.method>
      const path = route.path

      fastify[method](path, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const genericReq: GenericRequest = {
            method: request.method,
            url: request.url,
            headers: request.headers as Record<string, string>,
            query: request.query as Record<string, string>,
            body: request.body,
          }

          const response = await route.handler(genericReq)

          if (response.headers) {
            Object.entries(response.headers).forEach(([key, value]) => {
              reply.header(key, value)
            })
          }

          reply.status(response.status)

          if (typeof response.body === 'string') {
            reply.send(response.body)
          } else {
            reply.send(response.body)
          }
        } catch (error) {
          console.error('Route handler error:', error)
          reply.status(500).send({ error: 'Internal server error' })
        }
      })
    }

    return fastify
  }
}

