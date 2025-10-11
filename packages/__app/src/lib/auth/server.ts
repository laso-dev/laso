import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { reactStartCookies } from 'better-auth/react-start'
import { Pool } from 'pg'
import { env } from '../env'
import { db } from '../db'

export const auth = betterAuth({
  // trustedOrigins: ['http://localhost:3000'],
  emailAndPassword: { enabled: true },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await auth.api.createOrganization({
            body: {
              name: user.name,
              slug: user.id,
              userId: user.id,
            },
          })
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          const userId = session.userId

          const membership = await db
            .selectFrom('member')
            .selectAll()
            .where('userId', '=', userId)
            // Assumption: each user has only one organization.
            // See `organizationLimit` below.
            .executeTakeFirst()

          if (!membership) return

          await db
            .updateTable('session')
            .set({ activeOrganizationId: membership?.organizationId })
            .where('id', '=', session.id)
            .execute()
        },
      },
    },
  },
  plugins: [organization({ organizationLimit: 1 }), reactStartCookies()],
  database: new Pool({
    connectionString: env.DATABASE_URL,
  }),
})
