import { Box, Button, Stack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { JobCountsChart } from '../../components/chart-job-counts'
import { authClient } from '../../lib/auth'
import { trpc } from '../../lib/trpc'
import { useNavigate } from '../../router'

export default function Home() {
  const stats = trpc.instance.stats.useQuery(null)
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

      <Stack w="xl" mx="auto">
        <Box px="8">{stats.data && <JobCountsChart data={stats.data} />}</Box>
      </Stack>
    </Stack>
  )
}
