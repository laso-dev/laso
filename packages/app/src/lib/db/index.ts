import { DB as Database } from './types.ts'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { env } from '../env/index.ts'

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: env.DATABASE_URL,
  }),
})

export const db = new Kysely<Database>({ dialect })
