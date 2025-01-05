import { pgTable, integer, serial, bigint } from "drizzle-orm/pg-core";
import { matchPlayersTable } from "./match-players";
import { InferSelectModel } from "drizzle-orm/table";

export const playerItemsTable = pgTable("player_items", {
  playerItemId: serial("player_item_id").primaryKey(),
  matchPlayerId: bigint("match_player_id", { mode: "bigint" })
    .references(() => matchPlayersTable.matchPlayerId)
    .notNull(),
  itemId: integer("item_id").notNull(),
});

export type PlayerItemsInfo = InferSelectModel<typeof playerItemsTable>;
