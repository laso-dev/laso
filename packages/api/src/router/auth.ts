import z from 'zod'
import { publicProcedure, router } from '../lib/trpc'
import { prisma } from '../lib/prisma'

export const authRouter = router({
  exists: publicProcedure.input(z.object({ email: z.string() })).mutation(async ({ input }) => {
    const user = await prisma.user.findFirst({ where: { email: input.email.trim() } })
    return !!user
  }),
})
