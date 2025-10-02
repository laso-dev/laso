import { Button, HStack, Spinner } from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useSession } from '../hooks/use-session'
import { authClient } from '../lib/auth/client'
import { authMiddleware } from '../lib/auth/middleware'
import { db } from '../lib/db'

const getUsers = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async () => {
    return db.selectFrom('user').selectAll().execute()
  })

export const Route = createFileRoute('/_app/home')({
  component: RouteComponent,
  loader: async () => {
    return {
      users: await getUsers(),
    }
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  const session = useSession()
  const qc = useQueryClient()
  const navigate = useNavigate()

  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData: data.users,
  })

  return (
    <div className="p-10">
      <HStack>
        <h1>Users</h1>
        <Spinner hidden={!users.isFetching} />
      </HStack>

      <h2>Welcome, {session.data?.user.name}</h2>
      <ul>
        {users.data?.map((user) => (
          <li key={user.id}>
            {user.name || 'Na'} - <pre style={{ display: 'inline' }}>{user.email}</pre>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <Button
        mr="4"
        onClick={() => {
          users.refetch()
        }}
      >
        Refetch
      </Button>
      <Button
        onClick={async () => {
          await authClient.signOut({})
          qc.clear()
          navigate({ to: '/sign-in' })
        }}
      >
        Logout
      </Button>
    </div>
  )
}
