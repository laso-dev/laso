import Fastify from 'fastify'
import { createFastifyAdapter } from '@lasodev/api'

const fastify = Fastify({
  logger: true,
})

// Create Laso adapter
const lasoAdapter = createFastifyAdapter({
  basePath: '/app',
  uiVersion: 'latest',
})

// Register Laso routes
await fastify.register(async (instance) => {
  lasoAdapter(instance)
}, { prefix: '/app' })

// Start server
try {
  await fastify.listen({ port: 3001 })
  console.log('Fastify server running at http://localhost:3001')
  console.log('Laso app available at http://localhost:3001/app')
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

