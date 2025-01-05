import { InferSelectModel } from "drizzle-orm";
import { pgTable, bigint, numeric } from "drizzle-orm/pg-core";

export const championStatsTable = pgTable("champion_stats", {
  championId: bigint("champion_id", { mode: "bigint" }).primaryKey(),
  totalMinutesInMatches: bigint("total_minutes_in_matches", { mode: "bigint" }),
  totalWins: bigint("total_wins", { mode: "bigint" }),
  totalLosses: bigint("total_losses", { mode: "bigint" }),
  totalKills: bigint("total_kills", { mode: "bigint" }),
  totalDeaths: bigint("total_deaths", { mode: "bigint" }),
  totalAssists: bigint("total_assists", { mode: "bigint" }),
  totalGoldEarned: bigint("total_gold_earned", { mode: "bigint" }),
  totalGoldSpent: bigint("total_gold_spent", { mode: "bigint" }),
  totalDamageDealt: bigint("total_damage_dealt", { mode: "bigint" }),
  totalDamageTaken: bigint("total_damage_taken", { mode: "bigint" }),
  totalHealingDone: bigint("total_healing_done", { mode: "bigint" }),
  totalShieldingDone: bigint("total_shielding_done", { mode: "bigint" }),
  totalCreepScore: bigint("total_creep_score", { mode: "bigint" }),
  totalVisionScore: bigint("total_vision_score", { mode: "bigint" }),
  totalWardsPlaced: bigint("total_wards_placed", { mode: "bigint" }),
  totalWardsDestroyed: bigint("total_wards_destroyed", { mode: "bigint" }),
  totalCrowdControlScore: bigint("total_crowd_control_score", {
    mode: "bigint",
  }),

  totalKillParticipation: numeric("total_kill_participation", {
    precision: 10,
    scale: 2,
  }),
  totalDamagePercent: numeric("total_damage_percent", {
    precision: 10,
    scale: 4,
  }),
  totalGoldPerMinute: numeric("total_gold_per_minute", {
    precision: 10,
    scale: 2,
  }),
  totalCsPerMinute: numeric("total_cs_per_minute", { precision: 10, scale: 2 }),
});

export type ChampionStatsInfo = InferSelectModel<typeof championStatsTable>;
