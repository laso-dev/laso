import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { trpc } from '../lib/trpc'
import { Provider } from '../components/ui/provider'

export default function () {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8000/trpc',
          async headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'react')
            return headers
          },
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Outlet />
        </Provider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
