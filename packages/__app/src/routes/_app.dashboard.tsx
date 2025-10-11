import { Button, Flex, HStack, NativeSelect, Select, Spinner, Stack, Text } from '@chakra-ui/react'
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

export const Route = createFileRoute('/_app/dashboard')({
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
    <Stack>
      <Flex
        alignItems="center"
        h="12"
        bg="bg.panel"
        borderBottomWidth="1px"
        borderColor="border.emphasized/40"
        px="4"
      >
        <Text fontFamily="mono">Dashboard</Text>

        <NativeSelect.Root size="xs" key={1} w="52" ml="auto">
          <NativeSelect.Field value={'ok'}>
            <option value={'ok'}>Ok</option>
            <option value={'not ok'}>Not Ok</option>
            <option value={'maybe ok'}>Maybe Ok</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
      <Button
        hidden
        onClick={async () => {
          await authClient.signOut({})
          qc.clear()
          navigate({ to: '/sign-in' })
        }}
      >
        Logout
      </Button>
    </Stack>
  )
}
