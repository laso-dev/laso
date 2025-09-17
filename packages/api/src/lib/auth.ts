import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { organization } from 'better-auth/plugins'
import { prisma } from './prisma'

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:5173'],
  emailAndPassword: { enabled: true },
  plugins: [organization({})],
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
})
