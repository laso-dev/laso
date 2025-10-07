import { Kysely, PostgresDialect } from 'kysely'
import { SerializePlugin } from 'kysely-plugin-serialize'
import { Pool } from 'pg'
import { env } from '../env/index.ts'
import { DB as Database } from './types.ts'

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: env.DATABASE_URL,
  }),
})

export const db = new Kysely<Database>({
  dialect,
  plugins: [new SerializePlugin()],
})
