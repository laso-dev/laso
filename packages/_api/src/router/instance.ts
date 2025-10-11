import { JobType, Queue } from 'bullmq'
import Redis from 'ioredis'
import { protectedProcedure, router } from '../lib/trpc'
import { sumBy } from 'lodash-es'
import dayjs from 'dayjs'

export const instanceRouter = router({
  stats: protectedProcedure.query(async ({ input }) => {
    const redis = new Redis('redis://localhost:6379')
    const statuses = ['completed', 'failed', 'waiting']
    const startTime = dayjs().subtract(60, 'day')
    const endTime = dayjs()

    try {
      // Get all keys that match BullMQ queue pattern
      const keys = await redis.keys('bull:*:meta')

      // Extract queue names from the keys
      const queueNames = keys
        .map((key) => {
          const match = key.match(/^bull:(.+):meta$/)
          return match ? match[1] : null
        })
        .filter(Boolean) as string[]

      const queues = await Promise.all(
        queueNames.map(async (q) => {
          const queue = new Queue(q, { connection: { host: 'localhost', port: 6379 } })

          const jobCounts: Record<string, number> = {}

          for (const status of statuses) {
            const jobs = await queue.getJobs([status as JobType], 0, -1) // Get all jobs of this status
            const filteredJobs = jobs.filter((job) => {
              const jobTime = dayjs(job.timestamp || job.processedOn || job.finishedOn)
              return startTime.isBefore(jobTime) && endTime.isAfter(jobTime)
            })
            jobCounts[status] = filteredJobs.length
          }

          return {
            name: q,
            counts: jobCounts,
          }
        }),
      )

      return {
        active: sumBy(queues, 'counts.active'),
        completed: sumBy(queues, 'counts.completed'),
        delayed: sumBy(queues, 'counts.delayed'),
        failed: sumBy(queues, 'counts.failed'),
        paused: sumBy(queues, 'counts.paused'),
        prioritized: sumBy(queues, 'counts.prioritized'),
        waiting: sumBy(queues, 'counts.waiting'),
      }
    } finally {
      redis.disconnect()
    }
  }),
})
