import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../lib/trpc.js'

export const appRouter = router({
  hello: protectedProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return ctx.user.email
  }),

  // Example mutation
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      // Simulate creating a post
      return {
        id: Math.random().toString(36).substr(2, 9),
        title: input.title,
        content: input.content,
        createdAt: new Date(),
      }
    }),

  // Example query with no input
  getPosts: publicProcedure.query(() => {
    // Simulate fetching posts
    return [
      {
        id: '1',
        title: 'First Post',
        content: 'This is the first post',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        title: 'Second Post',
        content: 'This is the second post',
        createdAt: new Date('2024-01-02'),
      },
    ]
  }),
})

export type AppRouter = typeof appRouter
