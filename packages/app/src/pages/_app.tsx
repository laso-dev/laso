import { ColorModeProvider } from '@/components/ui/color-mode'
import { trpc } from '@/lib/trpc'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/inter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { Toaster } from '../components/ui/toaster'
import { system } from '../lib/theme'
import '../styles/global.css'

export default function () {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8000/trpc',
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' })
          },
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
    <ChakraProvider value={system}>
      <ColorModeProvider />
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </trpc.Provider>

      <Toaster />
    </ChakraProvider>
  )
}
