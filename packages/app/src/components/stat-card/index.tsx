import { useChart } from '@chakra-ui/charts'
import { Card, FormatNumber, Stat } from '@chakra-ui/react'
import { SimpleChart } from './chart'

export interface StatCardProps {
  title: string
  data: Array<{ date: string; value: number }>
}

export function StatCard(props: StatCardProps) {
  const { title, data } = props

  const chart = useChart({
    data,
    series: [{ name: 'value', color: 'orange.solid', label: 'Value' }],
  })

  const total = chart.getTotal('value')

  return (
    <Card.Root size="sm" variant="outline">
      <Card.Header>
        <Stat.Root>
          <Stat.Label>{title}</Stat.Label>
          <Stat.ValueText>
            <FormatNumber value={total /60} />
          </Stat.ValueText>
        </Stat.Root>
      </Card.Header>
      <Card.Body>
        <SimpleChart chart={chart} />
      </Card.Body>
    </Card.Root>
  )
}
