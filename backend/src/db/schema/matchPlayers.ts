import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { matches } from "./matches";
import { players } from "./players";

export const matchPlayers = pgTable("match_players", {
  matchPlayerId: text("match_player_id").primaryKey(),
  matchId: text("match_id")
    .references(() => matches.matchId)
    .notNull(),
  summonerId: text("summoner_id")
    .references(() => players.summonerId)
    .notNull(),
  team: text("team"),
  kills: integer("kills"),
  deaths: integer("deaths"),
  assists: integer("assists"),
  damageDealt: integer("damage_dealt"),
  level: integer("level"),
  goldEarned: integer("gold_earned"),
  csCount: integer("cs_count"),
  killParticipation: integer("kill_participation"),
});

export type MatchPlayersInfo = InferSelectModel<typeof matchPlayers>;
