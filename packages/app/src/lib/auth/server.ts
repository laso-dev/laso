import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { reactStartCookies } from 'better-auth/react-start'
import { Pool } from 'pg'
import { env } from '../env'

export const auth = betterAuth({
  // trustedOrigins: ['http://localhost:3000'],
  emailAndPassword: { enabled: true },
  plugins: [organization({}), reactStartCookies()],
  database: new Pool({
    connectionString: env.DATABASE_URL,
  }),
})
