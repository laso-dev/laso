import { initTRPC } from '@trpc/server'
import { z } from 'zod'

// Context type for Hono integration
export interface Context {
  // Add any context properties you need
  // For example: user, env variables, etc.
}

// Initialize tRPC
const t = initTRPC.context<Context>().create()

// Export reusable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure
