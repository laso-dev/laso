import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'
import { auth } from './auth'

export interface Context {
  req: Request
  rawHeaders: Headers
}

const t = initTRPC.context<Context>().create()

export const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: ctx.rawHeaders })

  if (!session?.session) throw new TRPCError({ code: 'UNAUTHORIZED' })

  return next({
    ctx: {
      ...ctx,
      user: session.user,
      session: session.session,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(authMiddleware)
