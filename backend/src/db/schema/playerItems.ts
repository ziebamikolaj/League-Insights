import { pgTable, integer, text, serial } from "drizzle-orm/pg-core";
import { items } from "./items";
import { matchPlayers } from "./matchPlayers";
import { InferSelectModel } from "drizzle-orm/table";

export const playerItems = pgTable("player_items", {
  playerItemId: serial("player_item_id").primaryKey(),
  matchPlayerId: text("match_player_id")
    .references(() => matchPlayers.matchPlayerId)
    .notNull(),
  itemId: integer("item_id")
    .references(() => items.itemId)
    .notNull(),
});

export type PlayerItemsInfo = InferSelectModel<typeof playerItems>;
