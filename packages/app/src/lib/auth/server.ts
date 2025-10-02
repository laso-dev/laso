import { betterAuth } from 'better-auth'
import { organization } from 'better-auth/plugins'
import { Pool } from 'pg'
import { env } from '../env'

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3000'],
  emailAndPassword: { enabled: true },
  plugins: [organization({})],
  database: new Pool({
    connectionString: env.DATABASE_URL,
  }),
})
