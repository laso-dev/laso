import { z } from 'zod'
import { protectedProcedure, router } from '../lib/trpc'
import { authRouter } from './auth'
import { queuesRouter } from './queues'

export const appRouter = router({
  auth: authRouter,
  queues: queuesRouter,
  hello: protectedProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return ctx.user.email
  }),
})

export type AppRouter = typeof appRouter
