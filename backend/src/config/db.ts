import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "athome",
  database: process.env.DB_NAME || "postgres",
  ssl: false
})

export const db = drizzle(pool)
