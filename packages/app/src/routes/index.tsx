import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '../lib/auth/client'

export const Route = createFileRoute('/')({
  beforeLoad: async ({}) => {
    const { data, error } = await authClient.getSession()

    if (!data?.session || error) {
      throw redirect({ to: '/sign-in' })
    } else {
      return redirect({ to: '/home' })
    }
  },
})
