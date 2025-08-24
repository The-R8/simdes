import type { Config } from "drizzle-kit"

export default {
  schema: "./src/modules/**/**.schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "athome",
    database: process.env.DB_NAME || "villager",
    ssl: false,
  }
} satisfies Config

