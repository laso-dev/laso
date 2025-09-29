import { Box, Button, Card, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { JobCountsChart } from '../../components/chart-job-counts'
import { authClient } from '../../lib/auth'
import { trpc } from '../../lib/trpc'
import { useNavigate } from '../../router'
import { StatCard } from '../../components/stat-card'

export const relayRequestsData: { date: string; value: number }[] = [
  { date: '2024-01-01', value: 120 },
  { date: '2024-01-02', value: 2897 },
  { date: '2024-01-03', value: 3456 },
  { date: '2024-01-04', value: 3789 },
]

export const functionCallsData: { date: string; value: number }[] = [
  { date: '2024-01-01', value: 2876 },
  { date: '2024-01-02', value: 3156 },
  { date: '2024-01-03', value: 2987 },
  { date: '2024-01-04', value: 3245 },
]

export const totalGasUsedData: { date: string; value: number }[] = [
  { date: '2024-01-01', value: 4532 },
  { date: '2024-01-02', value: 3897 },
  { date: '2024-01-03', value: 4123 },
  { date: '2024-01-04', value: 4567 },
]

export default function Home() {
  const stats = trpc.instance.stats.useQuery(null)
  const navigate = useNavigate()

  const logout = useMutation({ mutationFn: async () => authClient.signOut() })

  const queuedTime = trpc.stats.queuedTime.useQuery({})

  return (
    <Stack>
      <Heading size="xl">Dashboard</Heading>
      {/* <Button
        w="min"
        loading={logout.isPending}
        onClick={async () => {
          await logout.mutateAsync()
          navigate('/sign-in')
        }}
      >
        Logout
      </Button> */}

      <SimpleGrid gap="8" columns={{ base: 1, md: 3 }}>
        {queuedTime.data && (
          <StatCard title="Queued time (avg.)" data={queuedTime.data?.data || []} />
        )}
        <StatCard title="Processing time (avg.)" data={relayRequestsData} />
        <StatCard title="Completed per minute" data={totalGasUsedData} />
      </SimpleGrid>

      <Card.Root size="sm" variant="outline">
        <Card.Header>
          <Card.Title fontWeight="medium">Job statuses</Card.Title>
        </Card.Header>
        <Card.Body>{stats.data && <JobCountsChart data={stats.data} />}</Card.Body>
      </Card.Root>
    </Stack>
  )
}
