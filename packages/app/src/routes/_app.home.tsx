import { createFileRoute } from '@tanstack/react-router'
import { db } from '../lib/db'
import { createServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@chakra-ui/react'

const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  return db.selectFrom('user').selectAll().execute()
})

export const Route = createFileRoute('/_app/home')({
  component: RouteComponent,
  loader: async () => getUsers(),
})

function RouteComponent() {
  const data = Route.useLoaderData()

  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData: data,
  })

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.data?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <Button
        onClick={() => {
          users.refetch()
        }}
      >
        Refetch
      </Button>
    </div>
  )
}
