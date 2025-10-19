import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { createHonoAdapter } from '@lasodev/api'

const app = new Hono()

// Create a sub-app for Laso
const lasoApp = new Hono()

// Create Laso adapter
const lasoAdapter = createHonoAdapter({
  basePath: '/app',
  uiVersion: 'latest',
})

// Apply adapter
lasoAdapter(lasoApp)

// Mount Laso routes
app.route('/app', lasoApp)

// Start server
const port = 3002
console.log(`Hono server running at http://localhost:${port}`)
console.log(`Laso app available at http://localhost:${port}/app`)

serve({
  fetch: app.fetch,
  port,
})

