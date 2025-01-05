import { z } from "zod";
import { ParticipantDtoSchema } from "./participant.dto";

export const teamDtoSchema = z.object({
  teamId: z.number(),
  win: z.boolean(),
});

export const infoDtoSchema = z.object({
  gameId: z.number(),
  gameStartTimestamp: z.number(),
  participants: z.array(ParticipantDtoSchema),
  teams: z.array(teamDtoSchema),
  gameDuration: z.number(),
});

export const metadataDtoSchema = z.object({
  matchId: z.string(),
  participants: z.array(z.string()),
});

export const matchDtoSchema = z.object({
  metadata: metadataDtoSchema,
  info: infoDtoSchema,
});

export type MatchDto = z.infer<typeof matchDtoSchema>;
