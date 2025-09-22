import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Outlet } from 'react-router'
import { Navigation } from '../../components/navigation'
import { trpc } from '../../lib/trpc'
import { Navigate } from '../../router'

export default function () {
  const me = trpc.auth.me.useQuery()

  if (me.isLoading) return <Spinner m="10" />
  if (!me.data) return <Navigate to="/sign-in" />

  return (
    <Flex h="full" direction={{ base: 'column', md: 'row' }}>
      <Navigation />

      <Box p="3.5" flex="1" bg="bg.subtle">
        <Box bg="bg.panel" rounded="xl" flex="1" h="full" shadow="xs" p="4">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}
