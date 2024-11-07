import { pgEnum } from "drizzle-orm/pg-core";

export const QueueEnum = pgEnum("queue_enum", [
  "RANKED_SOLO_5x5",
  "RANKED_FLEX_SR",
]);
