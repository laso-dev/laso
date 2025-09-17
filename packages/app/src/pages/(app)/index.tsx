import { Button, Stack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { authClient } from '../../lib/auth'
import { trpc } from '../../lib/trpc'
import { useNavigate } from '../../router'

export default function Home() {
  const hello = trpc.hello.useQuery()

  const navigate = useNavigate()

  const logout = useMutation({
    mutationFn: async () => authClient.signOut(),
  })

  return (
    <Stack>
      <h1>Home {hello.data}</h1>
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
    </Stack>
  )
}
