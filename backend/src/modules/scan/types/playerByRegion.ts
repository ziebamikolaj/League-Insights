import { RankEnum, TierEnum } from "src/db/schema";
import { z } from "zod";

export const playerByRegionSchema = z.object({
  leagueId: z.string(),
  queueType: z.string(),
  rank: z.enum(RankEnum.enumValues),
  tier: z.enum(TierEnum.enumValues),
  summonerId: z.string(),
  leaguePoints: z.number(),
  wins: z.number(),
  losses: z.number(),
  veteran: z.boolean(),
  inactive: z.boolean(),
  freshBlood: z.boolean(),
  hotStreak: z.boolean(),
});

export const playersByRegionSchema = z.array(playerByRegionSchema);
export type PlayerByRegion = z.infer<typeof playerByRegionSchema>;
