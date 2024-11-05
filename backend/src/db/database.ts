import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";

import * as allSchema from "./schema";

dotenv.config();

if (typeof process.env.DATABASE_URL !== "string") {
  throw new Error("Env variable `DATABASE_URL` is required");
}

export const pgClient = postgres(process.env.DATABASE_URL);

export const db = drizzle(pgClient, {
  schema: {
    ...allSchema,
  },
});
