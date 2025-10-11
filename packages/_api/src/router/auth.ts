import { protectedProcedure, router } from '../lib/trpc'

export const authRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return {
      user: { id: ctx.user.id },
    }
  }),
})
