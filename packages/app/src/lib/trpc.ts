import { createTRPCProxyClient, httpBatchLink, httpLink, splitLink } from '@trpc/client'
import type { AppRouter } from '@laso/api'
import { createTRPCReact } from '@trpc/react-query'

const url = 'http://localhost:8000/trpc'
const fetchFn = (url, options) => fetch(url, { ...options, credentials: 'include' })

const headers = async () => {
  const headers = new Headers()
  headers.set('x-trpc-source', 'react')
  return headers
}

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => Boolean(op.context.skipBatch),
      true: httpLink({ url, fetch: fetchFn, headers }),
      false: httpBatchLink({ url, fetch: fetchFn, headers }),
    }),
  ],
})

export const trpc = createTRPCReact<AppRouter>({})
