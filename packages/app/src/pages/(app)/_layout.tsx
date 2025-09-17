import { Outlet } from 'react-router'
import { trpc } from '../../lib/trpc'
import { Navigate } from '../../router'
import { Spinner } from '@chakra-ui/react'

export default function () {
  const me = trpc.auth.me.useQuery()

  if (me.isLoading) return <Spinner m='10' />
  if (!me.data) return <Navigate to="/sign-in" />

  return <Outlet />
}
