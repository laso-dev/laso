import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP, organization } from 'better-auth/plugins'
import { prisma } from './prisma'

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:5173'],
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  plugins: [
    organization({}),
    emailOTP({
      sendVerificationOnSignUp: true,
      disableSignUp: false,
      async sendVerificationOTP({ email, otp, type }) {
        console.log('sendVerificationOTP', email, otp, type)
        if (type === 'sign-in') {
          // Send the OTP for sign in
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
})
