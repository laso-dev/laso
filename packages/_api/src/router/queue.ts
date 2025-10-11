import { Queue } from 'bullmq'
import Redis from 'ioredis'
import { protectedProcedure, router } from '../lib/trpc'

export const queuesRouter = router({
  browse: protectedProcedure.query(async ({ input }) => {
    const redis = new Redis({ host: 'localhost', port: 6379 })

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
          return {
            name: q,
            metrics: (await queue.getJobCounts()) as {
              active: number
              completed: number
              delayed: number
              failed: number
              paused: number
              prioritized: number
              waiting: number
              'waiting-children': number
            },
          }
        }),
      )

      return queues
    } finally {
      redis.disconnect()
    }
  }),
})
