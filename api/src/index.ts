import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { QueueManager } from "./queues.js";

const app = new Hono();
const queueManager = new QueueManager();

// API routes
app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/api/queues", async (c) => {
  const queues = await queueManager.getQueues();
  return c.json(queues);
});

// Serve static files from web/dist in production
app.use("/*", serveStatic({ root: "../web/dist" }));

// Fallback to index.html for SPA routing
app.get("/*", serveStatic({ root: "../web/dist", path: "index.html" }));

serve({ fetch: app.fetch, port: 8080 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
