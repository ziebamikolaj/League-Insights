import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

if (typeof process.env.DATABASE_URL !== "string") {
  throw new Error("Env variable `DATABASE_URL` is required");
}

export default {
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
