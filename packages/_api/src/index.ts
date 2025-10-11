import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './router'
import { auth } from './lib/auth'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    maxAge: 600,
  }),
)

app.on(['POST', 'GET'], '/api/auth/*', async (c) => {
  const response = await auth.handler(c.req.raw)

  if (response instanceof Response) {
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
})

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_, c) => ({
      req: c.req.raw,
      rawHeaders: c.req.raw.headers,
    }),
  }),
)

serve({ fetch: app.fetch, port: 8000 }, (info) => {
  console.log(`🌐 running on port ${info.port}`)
})
