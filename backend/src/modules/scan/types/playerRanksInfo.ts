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

export type PlayerRankInfo = {
  soloQueueTier?: string | null;
  soloQueueRank?: string | null;
  soloQueueLeaguePoints?: number | null;
  soloQueueWins?: number | null;
  soloQueueLoses?: number | null;
  soloQueueInActive?: boolean;
  soloQueueFreshBlood?: boolean;
  soloQueueHotStreak?: boolean;
  flexQueueTier?: string | null;
  flexQueueRank?: string | null;
  flexQueueLeaguePoints?: number | null;
  flexQueueWins?: number | null;
  flexQueueLoses?: number | null;
  flexQueueInActive?: boolean;
  flexQueueFreshBlood?: boolean;
  flexQueueHotStreak?: boolean;
};
