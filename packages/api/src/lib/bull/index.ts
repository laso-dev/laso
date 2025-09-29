import { Queue } from 'bullmq'
import Redis from 'ioredis'

export class BullMQ {
  private readonly redis: Redis

  constructor(
    private readonly input: {
      host: string
      port: number
    },
  ) {
    this.redis = new Redis({
      host: this.input.host,
      port: this.input.port,
    })
  }

  async getQueueNames() {
    const keys = await this.redis.keys('bull:*:meta')

    return (
      keys
        // Extract queue name from BullMQ key pattern: bull:queueName:meta
        .map((key) => {
          const match = key.match(/^bull:(.+):meta$/)
          return match ? match[1] : null
        })
        .filter(Boolean) as string[]
    )
  }

  async getQueues() {
    const queueNames = await this.getQueueNames()

    return Promise.all(
      queueNames.map(async (queueName) => {
        return new Queue(queueName, { connection: this.redis })
      }),
    )
  }
}
