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

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))

app.use('/trpc/*', trpcServer({ router: appRouter }))

serve({ fetch: app.fetch, port: 8000 }, (info) => {
  console.log(`🌐 running on port ${info.port}`)
})
