import { ColorModeProvider } from '@/components/ui/color-mode'
import { trpc, trpcClient } from '@/lib/trpc'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { Toaster } from '../components/ui/toaster'
import { system } from '../lib/theme'
import '../styles/global.css'

export default function () {
  const [queryClient] = useState(() => new QueryClient())
  const [client] = useState(() => trpcClient)

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider />
      <trpc.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </trpc.Provider>

      <Toaster />
    </ChakraProvider>
  )
}
