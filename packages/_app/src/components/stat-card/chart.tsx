import { Chart, type UseChartReturn } from '@chakra-ui/charts'
import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts'
import { Box, Text } from '@chakra-ui/react'

export function SimpleChart(props: { chart: UseChartReturn<{ date: string; value: number }> }) {
  const { chart } = props

  console.log(chart)
  return (
    <Chart.Root height="120px" chart={chart} pos="relative" insetStart="-2">
      <LineChart data={chart.data}>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key('date')}
          padding={{ left: 20, right: 0 }}
          tickFormatter={chart.formatDate({ month: 'short', day: 'numeric' })}
          stroke={chart.color('border')}
          ticks={[chart.data[0].date, chart.data[chart.data.length - 1].date]}
        />
        <YAxis
          width={0}
          axisLine={false}
          tick={false}
          dataKey={chart.key('value')}
          stroke={chart.color('border')}
          tickMargin={0}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload || !payload.length) return null

            return (
              <Box
                bg="bg.panel"
                p="2"
                rounded="md"
                shadow="sm"
                border="1px solid"
                borderColor="border"
              >
                <Text fontSize="sm" fontWeight="medium">
                  {chart.formatDate({ month: 'short', day: 'numeric' })(label as string)}
                </Text>
                {payload.map((entry) => (
                  <Text key={entry.dataKey} fontSize="sm" color={entry.color}>
                    {entry.name}: {entry.value}
                  </Text>
                ))}
              </Box>
            )
          }}
          cursor={{ stroke: chart.color('border'), strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            strokeWidth={2}
            stroke={chart.color(item.color)}
            dot={false}
            activeDot={{ r: 4, stroke: chart.color(item.color), strokeWidth: 2, fill: 'white' }}
          />
        ))}
      </LineChart>
    </Chart.Root>
  )
}
