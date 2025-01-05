import { RankEnum, TierEnum } from "src/db/schema";
import { z } from "zod";

export const playerRanksInfoSchema = z.object({
  leagueId: z.string(),
  queueType: z.string(),
  tier: z.enum(TierEnum.enumValues),
  rank: z.enum(RankEnum.enumValues),
  summonerId: z.string(),
  leaguePoints: z.number(),
  wins: z.number(),
  losses: z.number(),
  veteran: z.boolean(),
  inactive: z.boolean(),
  freshBlood: z.boolean(),
  hotStreak: z.boolean(),
});

export const playersRanksInfoSchema = z.array(playerRanksInfoSchema);

export type PlayerRankInfo = z.infer<typeof playerRanksInfoSchema>;
