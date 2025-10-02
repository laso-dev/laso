import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authClient } from '../lib/auth/client'
import { Box, Heading } from '@chakra-ui/react'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession()

    if (!data?.session || error) {
      throw redirect({ to: '/sign-in' })
    }
  },
})

function RouteComponent() {
  return (
    <Box p="10">
      <Heading size="xl">App</Heading>
      <Outlet />
    </Box>
  )
}
