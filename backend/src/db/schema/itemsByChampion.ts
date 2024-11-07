import { InferSelectModel } from "drizzle-orm";
import { pgTable, integer, text, serial } from "drizzle-orm/pg-core";
import { itemsTable } from "./items";

export const itemsByChampionTable = pgTable("items_by_champion", {
  id: serial("id").primaryKey(),
  championId: text("champion_id").notNull(),
  itemId: integer("item_id")
    .references(() => itemsTable.itemId)
    .notNull(),
  wins: integer("wins").default(0).notNull(),
  losses: integer("losses").default(0).notNull(),
});

export type ItemsByChampionInfo = InferSelectModel<typeof itemsByChampionTable>;
