import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const items = pgTable("items", {
  itemId: integer("item_id").primaryKey(),
  itemName: text("item_name").notNull(),
});

export type ItemInfo = InferSelectModel<typeof items>;
