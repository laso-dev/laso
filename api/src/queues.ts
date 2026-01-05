import { Queue } from "bullmq";
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const redis = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

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

// Scan Redis for BullMQ queue names
// BullMQ uses keys like "bull:<queueName>:meta"
async function scanQueueNames(): Promise<string[]> {
  const queueNames = new Set<string>();
  let cursor = "0";

  do {
    const [nextCursor, keys] = await redis.scan(cursor, "MATCH", "bull:*:meta");
    cursor = nextCursor;

    for (const key of keys) {
      // Extract queue name from "bull:<queueName>:meta"
      const match = key.match(/^bull:(.+):meta$/);
      if (match) {
        queueNames.add(match[1]);
      }
    }
  } while (cursor !== "0");

  return Array.from(queueNames).sort();
}

// Get job counts for a single queue
async function getQueueCounts(name: string): Promise<QueueInfo["counts"]> {
  const queue = new Queue(name, { connection: redis });

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

// Get all queues with their counts
export async function getQueues(): Promise<QueueInfo[]> {
  const names = await scanQueueNames();

  const queues = await Promise.all(
    names.map(async (name) => ({
      name,
      counts: await getQueueCounts(name),
    }))
  );

  return queues;
}
