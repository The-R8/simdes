import { drizzle } from "drizzle-orm/node-postgres";
import { reset, seed } from "drizzle-seed";
import { Pool } from "pg";

import "dotenv/config";

import * as schema from "../modules/schema";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "athome",
  database: process.env.DB_NAME || "postgres",
  ssl: false,
});

export const db = drizzle(pool);

async function dbSeeding() {
  await reset(db, schema);
  await seed(db, schema, { count: 10 });
  console.log("Database reset and seeded");
}

dbSeeding();
