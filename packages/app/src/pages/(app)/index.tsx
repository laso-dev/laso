import { Button, Stack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { authClient } from '../../lib/auth'
import { trpc } from '../../lib/trpc'
import { useNavigate } from '../../router'

export default function Home() {
  const queues = trpc.queues.browse.useQuery(null, { trpc: { context: { skipBatch: true } } })
  const hello = trpc.hello.useQuery()
  const navigate = useNavigate()

  const logout = useMutation({ mutationFn: async () => authClient.signOut() })

  return (
    <Stack>
      <Button
        w="min"
        loading={logout.isPending}
        onClick={async () => {
          await logout.mutateAsync()
          navigate('/sign-in')
        }}
      >
        Logout
      </Button>
      <pre>{JSON.stringify(queues.data, null, 2)}</pre>
      <pre>{JSON.stringify(hello.data, null, 2)}</pre>
    </Stack>
  )
}
