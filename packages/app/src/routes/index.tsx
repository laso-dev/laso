import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
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
