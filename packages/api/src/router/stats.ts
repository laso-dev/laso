import { groupBy, meanBy } from 'lodash-es'
import { BullMQ } from '../lib/bull'
import { protectedProcedure, router } from '../lib/trpc'
import z from 'zod'

export const statsRouter = router({
  queuedTime: protectedProcedure
    .input(
      z.object({
        from: z.date().optional(),
        to: z.date().optional(),
      }),
    )
    .query(async ({ input }) => {
      const bull = new BullMQ({ host: 'localhost', port: 6379 })
      const queues = await bull.getQueues()

      const { from, to } = input

      const fromTime = from?.getTime() || Date.now() - 7 * 24 * 60 * 60 * 100000
      const toTime = to?.getTime() || Date.now()

      const allJobs = await Promise.all(
        queues.map(async (queue) => {
          const jobs = await queue.getJobs(['waiting', 'active', 'completed'], 0, 1000)
          return jobs
            .filter((job) => 
              job.processedOn && 
              job.timestamp >= fromTime && 
              job.timestamp <= toTime &&
              job.processedOn > job.timestamp && // Ensure processedOn is after timestamp
              (job.processedOn - job.timestamp) < 24 * 60 * 60 * 1000 // Max 24 hours queue time
            )
            .map((job) => ({
              queuedTime: job.processedOn! - job.timestamp,
              date: new Date(job.timestamp).toISOString().split('T')[0],
            }))
        }),
      )

      const flatJobs = allJobs.flat()
      const groupedByDate = groupBy(flatJobs, 'date')

      const data = Object.entries(groupedByDate)
        .map(([date, jobs]) => ({
          date,
          value: Math.round(meanBy(jobs, 'queuedTime') / 1000) // Convert to seconds
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

      return { data }
    }),
})
