import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../lib/trpc'
import { authRouter } from './auth'

export const appRouter = router({
  auth: authRouter,

  hello: protectedProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return ctx.user.email
  }),
})

export type AppRouter = typeof appRouter
