import { Queue } from "bullmq";
import Redis from "ioredis";

export type QueueInfo = {
  name: string;
  counts: {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  };
};

export type QueueManagerOptions = {
  redisUrl?: string;
};

export class QueueManager {
  private redis: Redis;

  constructor(options: QueueManagerOptions = {}) {
    const redisUrl =
      options.redisUrl || process.env.REDIS_URL || "redis://localhost:6379";
    this.redis = new Redis(redisUrl, { maxRetriesPerRequest: null });
  }

  private async scanQueueNames(): Promise<string[]> {
    const queueNames = new Set<string>();
    let cursor = "0";

    do {
      const [nextCursor, keys] = await this.redis.scan(
        cursor,
        "MATCH",
        "bull:*:meta"
      );
      cursor = nextCursor;

      for (const key of keys) {
        const match = key.match(/^bull:(.+):meta$/);
        if (match) {
          queueNames.add(match[1]);
        }
      }
    } while (cursor !== "0");

    return Array.from(queueNames).sort();
  }

  private async getQueueCounts(name: string): Promise<QueueInfo["counts"]> {
    const queue = new Queue(name, { connection: this.redis });

    try {
      const counts = await queue.getJobCounts(
        "waiting",
        "active",
        "completed",
        "failed",
        "delayed"
      );
      return {
        waiting: counts.waiting ?? 0,
        active: counts.active ?? 0,
        completed: counts.completed ?? 0,
        failed: counts.failed ?? 0,
        delayed: counts.delayed ?? 0,
      };
    } finally {
      await queue.close();
    }
  }

  async getQueues(): Promise<QueueInfo[]> {
    const names = await this.scanQueueNames();

    const queues = await Promise.all(
      names.map(async (name) => ({
        name,
        counts: await this.getQueueCounts(name),
      }))
    );

    return queues;
  }

  async close(): Promise<void> {
    await this.redis.quit();
  }
}
