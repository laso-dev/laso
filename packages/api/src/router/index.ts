import { z } from 'zod'
import { protectedProcedure, router } from '../lib/trpc'
import { authRouter } from './auth'
import { queuesRouter } from './queue'
import { instanceRouter } from './instance'

export const appRouter = router({
  auth: authRouter,
  queues: queuesRouter,
  instance: instanceRouter,
  hello: protectedProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return ctx.user.email
  }),
})

export type AppRouter = typeof appRouter
