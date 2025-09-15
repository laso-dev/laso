import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@laso/api'
import { createTRPCReact } from '@trpc/react-query'

export const api = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:8000/trpc' })],
})

export const trpc = createTRPCReact<AppRouter>({})
