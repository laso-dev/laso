import { BarSegment, useChart } from '@chakra-ui/charts'
import { Text } from '@chakra-ui/react'

export type JobCountsChartProps = {
  data: {
    active?: number
    completed?: number
    delayed?: number
    failed?: number
    paused?: number
    prioritized?: number
    waiting?: number
    'waiting-children'?: number
  }
}

export function JobCountsChart({ data }: JobCountsChartProps) {
  if (!data) return null

  const chart = useChart({
    sort: { by: 'value', direction: 'desc' },
    data: [
      { name: 'Active', value: data.active, color: 'teal.solid' },
      { name: 'Completed', value: data.completed, color: 'blue.solid' },
      { name: 'Delayed', value: data.delayed, color: 'orange.solid' },
      { name: 'Failed', value: data.failed, color: 'purple.solid' },
      { name: 'Paused', value: data.paused, color: 'pink.solid' },
      { name: 'Prioritized', value: data.prioritized, color: 'purple.solid' },
      { name: 'Waiting', value: data.waiting, color: 'orange.solid' },
      { name: 'Waiting Children', value: data['waiting-children'], color: 'purple.solid' },
    ].filter((item) => item.value > 0),
  })

  if (chart.data.length === 0) return <Text>No data</Text>

  return (
    <BarSegment.Root chart={chart}>
      <BarSegment.Content>
        <BarSegment.Value />
        <BarSegment.Bar tooltip />
      </BarSegment.Content>
      <BarSegment.Legend showPercent />
    </BarSegment.Root>
  )
}
