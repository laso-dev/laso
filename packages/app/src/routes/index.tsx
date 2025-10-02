import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  return [{ id: 1, name: 'John Doe', email: 'john@example.com' }] as const
})

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async (): Promise<{ users: Array<{ id: number; name: string; email: string }> }> => {
    const users = await getUsers()
    return { users: [{ id: 1, name: 'John Doe', email: 'john@example.com' }] }
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const { users } = data

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
