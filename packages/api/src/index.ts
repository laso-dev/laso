// Core types
export type { LasoConfig, GenericRequest, GenericResponse, RouteHandler, Route } from './core/types.js'

// Adapters
export { createExpressAdapter } from './adapters/express.js'
export { createFastifyAdapter } from './adapters/fastify.js'
export { createHonoAdapter } from './adapters/hono.js'

// Core utilities (for advanced usage)
export { createRoutes } from './core/routes.js'
export { generateHTML } from './core/html.js'

