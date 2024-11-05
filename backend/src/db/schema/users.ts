import { InferSelectModel } from "drizzle-orm";
import { serial, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export type UserInfo = InferSelectModel<typeof users>;
