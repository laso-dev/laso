import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { auth } from './server'

export const authMiddleware = createMiddleware({ type: 'request' }).server(async ({ next }) => {
  const request = getRequest()

  const data = await auth.api.getSession({ headers: request?.headers })

  return next({
    context: {
      session: data?.session,
      user: data?.user,
    },
  })
})
