import { z } from "zod";

export const playerAccountInfoSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  puuid: z.string(),
  profileIconId: z.number(),
  revisionDate: z.number(),
  summonerLevel: z.number(),
});
export type PlayerAccountInfo = z.infer<typeof playerAccountInfoSchema>;
