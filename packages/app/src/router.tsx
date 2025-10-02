import { ChakraProvider } from '@chakra-ui/react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './generated/route-tree'
import * as TanstackQuery from './lib/query'
import { system } from './lib/theme'

export const getRouter = () => {
  const ctx = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...ctx,
      session: undefined,
      user: undefined,
    },
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
