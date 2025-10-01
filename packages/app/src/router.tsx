import { ChakraProvider } from '@chakra-ui/react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from './lib/query'
import { system } from './lib/theme'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const ctx = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...ctx },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <ChakraProvider value={system}>
          <TanstackQuery.Provider {...ctx}>{props.children}</TanstackQuery.Provider>
        </ChakraProvider>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient: ctx.queryClient })

  return router
}
