import type { Route, LasoConfig } from './types.js'
import { generateHTML } from './html.js'

export function createRoutes(config: LasoConfig): Route[] {
  return [
    // Serve the UI app
    {
      method: 'GET',
      path: '/',
      handler: () => ({
        status: 200,
        headers: { 'Content-Type': 'text/html' },
        body: generateHTML(config),
      }),
    },

    // Health check endpoint
    {
      method: 'GET',
      path: '/health',
      handler: () => ({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { status: 'ok', timestamp: new Date().toISOString() },
      }),
    },

    // Example data endpoint
    {
      method: 'GET',
      path: '/api/data',
      handler: () => ({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          message: 'Hello from Laso API',
          data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
          ],
        },
      }),
    },

    // Example POST endpoint
    {
      method: 'POST',
      path: '/api/data',
      handler: (req) => ({
        status: 201,
        headers: { 'Content-Type': 'application/json' },
        body: {
          message: 'Data created',
          received: req.body,
        },
      }),
    },
  ]
}

