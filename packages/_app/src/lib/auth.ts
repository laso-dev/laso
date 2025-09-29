import { createAuthClient } from 'better-auth/client'
import { emailOTPClient, organizationClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8000',
  plugins: [organizationClient(), emailOTPClient()],
})
