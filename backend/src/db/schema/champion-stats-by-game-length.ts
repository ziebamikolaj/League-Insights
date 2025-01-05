import { pgTable, text, bigint } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const championStatsByTimeBucketTable = pgTable(
  "champion_stats_by_time_bucket",
  {
    championId: text("champion_id").notNull(),
    timeBucket: text("time_bucket").notNull(), // "0-5", "5-10", and so on
    wins: bigint("wins", { mode: "bigint" }).notNull(),
    losses: bigint("losses", { mode: "bigint" }).notNull(),
  },
  (table) => ({
    primaryKey: table.championId,
    compositeKey: [table.championId, table.timeBucket],
  }),
);

export type ChampionStatsByTimeBucketInfo = InferSelectModel<
  typeof championStatsByTimeBucketTable
>;
