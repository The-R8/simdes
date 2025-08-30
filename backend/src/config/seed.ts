import { reset, seed } from "drizzle-seed";
import { db } from "./db";
import * as schema from "../modules/schema";

async function dbSeeding() {
  await reset(db, schema);
  await seed(db, schema, { count: 10 });
  console.log("Database reset and seeded");
}

dbSeeding();
