import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { trpcServer } from '@hono/trpc-server'
import { appRouter } from './router'

const app = new Hono()

// tRPC middleware
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    // Optional: Create context function
    // createContext: (_opts, c) => ({
    //   // Access Hono context here
    //   // user: c.get('user'),
    //   // env: c.env,
    // }),
  }),
)

app.get('/', (c) => {
  return c.text('Hello Hono! tRPC is available at /trpc')
})

serve({ fetch: app.fetch, port: 8000 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
