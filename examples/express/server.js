import express from 'express'
import { createExpressAdapter } from '@lasodev/api'

const app = express()
const port = 3000

// Parse JSON bodies
app.use(express.json())

// Create Laso adapter
const lasoAdapter = createExpressAdapter({
  basePath: '/app',
  uiVersion: 'latest', // or specific version like '0.0.3'
})

// Mount Laso routes
const router = express.Router()
lasoAdapter(router)
app.use('/app', router)

// Start server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`)
  console.log(`Laso app available at http://localhost:${port}/app`)
})

