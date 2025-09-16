import { Button, Stack } from '@chakra-ui/react'
import { api, trpc } from '../lib/trpc'
import { useMutation } from '@tanstack/react-query'
import { authClient } from '../lib/auth'

export default function Home() {
  const hello = trpc.hello.useQuery()

  const logout = useMutation({
    mutationFn: async () => {
      const { error, data } = await authClient.signOut()
      if (error) throw error
      return data
    },
  })

  return (
    <Stack>
      <h1>Home {hello.data}</h1>
      <Button w="min" loading={logout.isPending} onClick={async () => await logout.mutateAsync()}>Logout</Button>
    </Stack>
  )
}
