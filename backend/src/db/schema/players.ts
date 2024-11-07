import { InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { RankEnum, RegionEnum, TierEnum } from "./types/enums";

export const playersTable = pgTable("players", {
  puuid: text("puuid").primaryKey().unique(),
  summonerId: text("summoner_id"),
  region: RegionEnum("region").notNull(),
  profileIconId: integer("profile_icon_id"),
  summonerLevel: integer("summoner_level"),
  analyzedOn: timestamp("analyzed_on").default(sql`now()`),
  soloQueueTier: TierEnum("solo_queue_tier"),
  soloQueueRank: RankEnum("solo_queue_rank"),
  soloQueueLeaguePoints: integer("solo_queue_league_points"),
  soloQueueWins: integer("solo_queue_wins"),
  soloQueueLoses: integer("solo_queue_loses"),
  soloQueueInActive: boolean("solo_queue_inactive"),
  soloQueueFreshBlood: boolean("solo_queue_fresh_blood"),
  soloQueueHotStreak: boolean("solo_queue_hot_streak"),
  flexQueueTier: TierEnum("flex_queue_tier"),
  flexQueueRank: RankEnum("flex_queue_rank"),
  flexQueueLeaguePoints: integer("flex_queue_league_points"),
  flexQueueWins: integer("flex_queue_wins"),
  flexQueueLoses: integer("flex_queue_loses"),
  flexQueueInActive: boolean("flex_queue_inactive"),
  flexQueueFreshBlood: boolean("flex_queue_fresh_blood"),
  flexQueueHotStreak: boolean("flex_queue_hot_streak"),
});

export type PlayerInfo = InferSelectModel<typeof playersTable>;
